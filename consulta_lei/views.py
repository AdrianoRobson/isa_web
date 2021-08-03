from django.shortcuts import render

# Create your views here.

from os import path
from .models import Artigo, Codigo
from django.http import HttpResponse

from django.core import serializers


def index(request):

    """db_path = path.join('C:\\Users\\adriano\\Desktop\\', 'artigo5.txt')

    with open(db_path, encoding='UTF-8') as file:

        context = {
            'artigo': file.readlines()
        }

    return render(request, 'index.html', context)"""
    return render(request, 'index.html')


def isa(request, artigo, codigo):

    art = serializers.serialize("json", Artigo.objects.raw(f'select * from consulta_lei_artigo where idCod = {codigo} and artigoNumero = {artigo}'))

    return HttpResponse(art, content_type="application/json")



