import os
# import cgi
import json
from datetime import datetime
from decimal import Decimal
from uuid import UUID

from django.http import HttpResponse
from django.shortcuts import render

from iisfreshman import settings
from common.mssql import MsSQL


def dbconn_required(func):
    def _get_dbconn(request, *args, **kwargs):
        db_auth = request.GET.get('db')
        if db_auth in settings.DATABASE_AUTHS:
            db = settings.DATABASE_AUTHS[db_auth]
        else:
            db = settings.DATABASE_AUTHS['.']
        request.db = MsSQL(host=db['host'], user=db['user'], psw=db['psw'], db=db['db'])
        return func(request, *args, **kwargs)
    return _get_dbconn


def __covert_query_matrix(matrix, headers):
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


@dbconn_required
def top(request, table_name, count):
    try:
        cols = request.db.get_col_name(table_name)
        sql = 'SELECT TOP {count} * FROM {table_name}'.format(count=count, table_name=table_name)
        data_json = __covert_query_matrix(request.db.exec_query(sql), cols)
    except Exception as ex:
        return HttpResponse('Request Error. Please check your query conditions.')

    return render(request, 'hello.html', {'content': data_json})
