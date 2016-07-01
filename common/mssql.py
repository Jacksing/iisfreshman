import pymssql

class MsSQL(object):
    def __init__(self, host, db, user, psw):
        self.host = host
        self.db = db
        self.user = user
        self.psw = psw

    def __get_connect(self):
        if not self.db:
            raise (NameError, "No database configuration.")
        # self.conn = pymssql.connect(server=self.host, database=self.db, user=self.user, password=self.psw, charset='utf-8')
        self.conn = pymssql.connect(self.host, self.user, self.psw, self.db)
        cur = self.conn.cursor()
        if not cur:
            raise(NameError, 'Connect database failed.')
        else:
            return cur

    def get_col_name(self, table_name):
        sql = "SELECT NAME FROM SYSCOLUMNS WHERE ID = OBJECT_ID(N'{table_name}') ORDER BY COLORDER".format(table_name=table_name)
        return tuple(item[0] for item in self.exec_query(sql))

    def exec_query(self, sql):
        cur = self.__get_connect()
        cur.execute(sql)
        res = cur.fetchall()
        self.conn.close()
        return res

    def exec_non_query(self, sql):
        cur = self.__get_connect()
        cur.execute(sql)
        self.conn.commit()
        self.conn.close()
