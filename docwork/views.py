import os
import json
from urllib.parse import quote

from django.conf import settings
from django.shortcuts import render, redirect, resolve_url

import markdown2
import requests

from iisfreshman import settings
from common.utils import __open_to_read


def __read_css(css_file):
    css_file = css_file.rstrip()
    with __open_to_read(os.path.join(settings.BASE_DIR, 'statics/css/', css_file)) as f:
        return f.read()


def list(request, required=None):
    dl = []
    for _, _, files in os.walk(os.path.join(settings.BASE_DIR, 'markdowns')):
        for f in files:
            name = os.path.splitext(f)[0]
            dl.append([name, resolve_url('doc', name)])
    return render(request, 'doc_list.html', {'doc_list': dl, 'required': required})


def _process_server(doc_name, md_text):
    if doc_name != 'servers': return md_text

    query_api = settings.DEPLOY_STATUS_QUERY_API
    web_list = settings.DEPLOY_WEB_LIST
    folders = ','.join([quote(v['folder']) for v in web_list.values()])
    status_dict = json.loads(requests.get(query_api + folders).text)

    for k in web_list.keys():
        # store to dict for usage in the future.
        folder_path = web_list[k]['folder']
        web_list[k]['deploy_time'] = status_dict[folder_path]['deploy_time']
        web_list[k]['db_host'] = status_dict[folder_path]['data_source']
        web_list[k]['db_name'] = status_dict[folder_path]['initial_catalog']
        web_list[k]['db_user'] = status_dict[folder_path]['user_id']
        web_list[k]['db_pws'] = status_dict[folder_path]['password']

        db_host = web_list[k]['db_host'].strip() == '.' and '(local)' or web_list[k]['db_host']

        md_text = md_text.replace('{}_{}'.format(k, 'deploy_time'), web_list[k]['deploy_time'])
        md_text = md_text.replace('{}_{}'.format(k, 'db_host'), db_host)
        md_text = md_text.replace('{}_{}'.format(k, 'db_name'), web_list[k]['db_name'])

    return md_text

def doc(request, doc_name):
    md_file = os.path.join(settings.BASE_DIR, 'markdowns/{doc_name}.md'.format(doc_name=doc_name))
    try:
        with __open_to_read(md_file) as f:
            md_file = f.read()
    except FileNotFoundError:
        return list(request, doc_name)
    md_text = markdown2.markdown(md_file)

    md_text = _process_server(doc_name, md_text)
    
    return render(request, 'md_base.html', {'title':doc_name, 'content': md_text, })
