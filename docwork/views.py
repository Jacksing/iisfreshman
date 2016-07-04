import os

from django.shortcuts import render, redirect, resolve_url

import markdown2

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


def doc(request, doc_name):
    md_file = os.path.join(settings.BASE_DIR, 'markdowns/{doc_name}.md'.format(doc_name=doc_name))
    try:
        with __open_to_read(md_file) as f:
            md_file = f.read()
    except FileNotFoundError:
        return list(request, doc_name)
    md_text = markdown2.markdown(md_file)

    css_text = __read_css('md-avenir-white.css')
    
    return render(request, 'md_base.html', {'content': md_text, 'stylesheet': css_text})