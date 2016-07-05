from datetime import datetime
from itertools import groupby
import json
import re

pattern = '时间:(.*?), Id:(.*?), 模块名称:(.*?), 事件:(.*?), 信息代码位置:(.*?), 等级:(.*?), 操作人:(.*?)\n'
pattern = '时间:([\s\S]*?), Id:([\s\S]*?), 模块名称:([\s\S]*?), 事件:([\s\S]*?), 信息代码位置:([\s\S]*?), 等级:([\s\S]*?), 操作人:([\s\S]*?)\n'
pattern = '时间:(?P<datetime>[\s\S]*?), Id:(?P<id>[\s\S]*?), 模块名称:(?P<module>[\s\S]*?), 事件:(?P<event>[\s\S]*?), 信息代码位置:(?P<position>[\s\S]*?), 等级:(?P<level>[\s\S]*?), 操作人:(?P<user>[\s\S]*?)\n'

class JsonConverter(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return datetime.strftime(obj, '%Y-%m-%d %H:%M:%S.%f')

def process_single_log(lg):
    return {
        'datetime': datetime.strptime(lg[0], '%Y-%m-%d %H:%M:%S:%f'),
        'id': lg[1],
        'module': lg[2],
        'event': lg[3],
        'position': lg[4],
        'level': lg[5],
        'user': lg[6],
    }


def convert(file):
    with open(file, 'r', encoding='utf-8_sig') as f:
        lg = f.read()
    lg_arr = re.findall(pattern, lg)

    lg_arr = list(map(process_single_log, lg_arr))
    group_fun = lambda l: l['datetime'].year
    lg_arr = sorted(lg_arr, key=group_fun)
    grouped = groupby(lg_arr, group_fun)

    for _, g in grouped:
        print(_)
        print(json.dumps(list(g), cls=JsonConverter, indent=2, ensure_ascii=False))


convert('log2.log')