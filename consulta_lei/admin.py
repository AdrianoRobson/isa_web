from django.contrib import admin

# Register your models here.

from .models import Artigo, Codigo


class ArtigoAdmin(admin.ModelAdmin):
    list_display = ('artigoNumero', 'artigoInalterado')


class CodigoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nomeCodigo', 'ehDividido')


admin.site.register(Artigo, ArtigoAdmin)
admin.site.register(Codigo, CodigoAdmin)