import os
import csv
import json
from datetime import datetime
from decimal import Decimal
from uuid import UUID

from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.shortcuts import render_to_response

from iisfreshman import settings
from common.mssql import MsSQL


# Decorator which reading config information in request to create
# a database helper object, and pass it to the decorated function.
# If no config information in request, use the default configuration.
def dbconn_required(func):
    def _get_dbconn(request, *args, **kwargs):
        db_auth = request.GET.get('db')
        if db_auth in settings.DATABASE_AUTHS:
            db = settings.DATABASE_AUTHS[db_auth]
        else:
            db = settings.DATABASE_AUTHS['.']
        kwargs['db'] = MsSQL(host=db['host'], user=db['user'], psw=db['psw'], db=db['db'])
        return func(request, *args, **kwargs)
    return _get_dbconn


# Convert results that queried from database to string format.
# Append the table headers in the first if parameter `headers` given.
def _covert_query_matrix(matrix, headers):
    all = []
    if headers is not None:
        all.append(headers)
    for r in matrix:
        t = []
        for c in r:
            tp = type(c)
            if tp is Decimal or tp is UUID or tp is datetime:
                t.append(c.__str__())
            else:
                t.append(c)
        all.append(t)
    return all


class Echo(object):
    # def __init__(self, encoding='utf-8'):
    #     self.encoder = codecs.getincrementalencoder(encoding)()

    def write(self, value):
        return value


@dbconn_required
def page(request, *args, **kwargs):
    try:
        table_name = kwargs['table_name']

        # Get query string parameters.
        page_size = 'page_size' in kwargs and int(kwargs['page_size']) or 15
        page_no = 'page_no' in kwargs and int(kwargs['page_no']) or 1
        start = (page_no - 1) * page_size
        end = page_size + start

        # Database object is passed by decorator.
        db = kwargs['db']

        if request.GET.get('columns', None):
            columns_str = request.GET['columns']
            columns = columns_str.split(',')
        else:
            # If no columns specified by request, get all of the columns back.
            columns = db.get_col_name(table_name)
            columns_str = ', '.join(columns)
        order_by = 'sort' in request.GET and request.GET['sort'] or columns[0]

        # Sql for Microsoft SqlServer 2012
        sql = '''
        SELECT {columns_str} 
        FROM (
            SELECT {columns_str}, ROW_NUMBER() OVER (ORDER BY {order_by}) AS ROWNUMBER
            FROM {table_name}
        ) TMP
        WHERE ROWNUMBER > {start} AND ROWNUMBER <= {end}
        ORDER BY {order_by}
        '''.format(columns_str=columns_str, order_by=order_by, table_name=table_name, start=start, end=end)

        data = _covert_query_matrix(db.exec_query(sql), None)
    except Exception as ex:
        # Any error query condition leads to an error result.
        # User who uses this API should strictly follow the usage rules.
        # TODO: Maybe an usage rule page should be created to explain API itself.
        return HttpResponse('Request Error. Please check your query conditions.')

    content = {
        'table_name': table_name,
        'page_size': page_size,
        'page_no': page_no,
        'columns': columns,
        'data': data
    }

    # Get destination output data format.
    if 'application/json' in request.META['HTTP_ACCEPT'] or request.GET.get('accept', None) == 'json':
        accept = 'json'
    else:
        accept = request.GET.get('accept', 'html')

    # Generate destination data from query result.
    if accept == 'json':
        return JsonResponse(content)
        
    elif accept == 'csv':
        csv_matrix = []
        csv_matrix.append(content['columns'])
        csv_matrix += content['data']

        pseudo_buffer = Echo()
        writer = csv.writer(pseudo_buffer)
        response = StreamingHttpResponse(
            (writer.writerow(row) for row in csv_matrix),
            content_type='text/csv'
        )
        response['Content-Disposition'] = 'attachment; filename="{}.csv"'.format(table_name)
        return response

    elif accept == 'sql':
        properties = db.get_col_property(table_name)
        insert_schema = "INSERT INTO {table_name} ({columns_str}) VALUES ({value_str});"

        # Get each cell value be prepared to be combined into a sql sentence.
        def convert_cell_value(col_name, cell_value):
            col_type = properties[col_name]['TYPE']
            col_is_nullable = properties[col_name]['ISNULLABLE'] == 0 and True or False
            
            if cell_value is None:
                return 'NULL'
            if col_type in ['uniqueidentifier', 'nvarchar']:
                return "'{}'".format(cell_value)
            elif col_type =='datatime':
                return datetime.strptime(cell_value, '%Y-%m-%d %H-%M-%S.%f')
            elif col_type == 'int':
                return str(cell_value)
            else:
                return str(cell_value)

        def sql_generator():
            for row in content['data']:
                row.reverse()
                value_list = []
                for col_name in columns:
                    value_list.append(convert_cell_value(col_name, row.pop()))
                insert_sql = insert_schema.format(
                    table_name=table_name.upper(),
                    columns_str=columns_str,
                    value_str=','.join(value_list)
                )
                yield insert_sql + '\r\n'
        
        response = StreamingHttpResponse(sql_generator())
        response['Content-Disposition'] = 'attachment; filename="{}.sql"'.format(table_name + '_insert')
        return response

        return render_to_response('table.html', content)
            
    else:
        return render_to_response('table.html', content)