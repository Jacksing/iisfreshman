import os

from django.http import HttpResponse
from django.shortcuts import render

import markdown2

from tblwork.hello import _main

from iisfreshman import settings

def hello(request, count):
    data_json = _main(count)
    return render(request, 'hello.html', {'content': data_json})

def __read_css(css_file):
    css_file = css_file.rstrip()
    return open(os.path.join(settings.BASE_DIR, 'statics/css/', css_file)).read()


def doc(request, doc_name):
    md_file = os.path.join(settings.BASE_DIR, 'templates/{doc_name}.md'.format(doc_name=doc_name))
    md_file = open(md_file, 'r', encoding='utf-8').read()
    md_text = markdown2.markdown(md_file)

    css_text = __read_css('md-avenir-white.css')
    
    return render(request, 'md_base.html', {'content': md_text, 'stylesheet': css_text})