from django.urls import path
from.views import index, isa

from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    # path('produto/<int:pk>', produto, name='produto'),
    path('', index, name='index'),
    path('isa/<str:artigo>/<str:codigo>', isa, name='isa'),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('images/favicon.ico')))
]