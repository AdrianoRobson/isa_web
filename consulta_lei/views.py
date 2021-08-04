from django.shortcuts import render

# Create your views here.

from os import path
from .models import Artigo, Codigo
from django.http import HttpResponse

from django.core import serializers


def index(request):

    return render(request, 'index.html')


def isa(request, artigo, codigo):

    art = serializers.serialize("json", Artigo.objects.raw(f'select * from consulta_lei_artigo where idCod = {codigo} and artigoNumero = {artigo}'))

    return HttpResponse(art, content_type="application/json")



