from django.urls import path
from.views import index, isa

urlpatterns = [
    # path('produto/<int:pk>', produto, name='produto'),
    path('', index, name='index'),
    path('isa/<str:artigo>/<str:codigo>', isa, name='isa'),
]