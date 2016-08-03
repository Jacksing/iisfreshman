"""iisfreshman URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from tblwork import views as tblwork
from docwork import views as docwork

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^table/paging/(?P<table_name>[^/]*)/(?P<page_size>[1-9]\d*)/(?P<page_id>[1-9]\d*)/$', tblwork.page),
    url(r'^table/paging/(?P<table_name>[^/]*)/(?P<page_size>[1-9]\d*)/$', tblwork.page),
    url(r'^table/paging/(?P<table_name>[^/]*)/$', tblwork.page),

    url(r'^table/test/(?P<table_name>[^/]*)/$', tblwork.test_set),

    url(r'^docs/$', docwork.doc_list, name='doc_list'),
    url(r'^docs/(.*)/$', docwork.doc, name='doc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

try:
    from rismo import views as rismo
    urlpatterns += url(r'^rismo/trade/', rismo.trade),
    urlpatterns += url(r'^rismo/user/', rismo.user_info),
except:
    pass
