from django.db import models

# Create your models here.


class Artigo(models.Model):
    artigoNumero = models.CharField('Numero do artigo', max_length=4)
    artigoTexto = models.TextField('Texto do artigo alterado')
    artigoInalterado = models.TextField('Texto do artigo inalterado')
    idCod = models.CharField('id do codigo', max_length=4)
    parte = models.CharField('Artigo dividido Parte', max_length=1)
    infoSuperior = models.CharField('Informação superior do códio', max_length=1000)

    def __str__(self):
        return f'{self.artigoNumero}'


class Codigo(models.Model):
    nomeCodigo = models.CharField('Nome do código', max_length=150)
    ehDividido = models.CharField('É dividido', max_length=1)

    def __str__(self: object) -> str:
        return f'{self.nomeCodigo}'
