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

        page_size = 'page_size' in kwargs and int(kwargs['page_size']) or 15
        page_no = 'page_no' in kwargs and int(kwargs['page_no']) or 1
        start = (page_no - 1) * page_size
        end = page_size + start

        db = kwargs['db']

        if request.GET.get('columns', None):
            columns_str = request.GET['columns']
            columns = columns_str.split(',')
        else:
            columns = db.get_col_name(table_name)
            columns_str = ', '.join(columns)
        order_by = 'sort' in request.GET and request.GET['sort'] or columns[0]

        # sql for Microsoft SqlServer 2012
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
        return HttpResponse('Request Error. Please check your query conditions.')

    content = {
        'table_name': table_name,
        'page_size': page_size,
        'page_no': page_no,
        'columns': columns,
        'data': data
    }

    if 'application/json' in request.META['HTTP_ACCEPT'] or request.GET.get('accept', None) == 'json':
        accept = 'json'
    elif request.GET.get('accept', None) == 'csv':
        accept = 'csv'
    else:
        accept = 'html'

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
    else:
        return render_to_response('table.html', content)