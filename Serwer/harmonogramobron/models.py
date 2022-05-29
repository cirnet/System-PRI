from django.db import models
from django.contrib.postgres.fields import ArrayField

class Harmonogram(models.Model):
    id = models.BigAutoField(primary_key=True)
    schedule = ArrayField(models.CharField(max_length=200), blank=True)
    opiekun = models.TextField(max_length=50, blank=True, null=True)
    class Meta:
        managed = True
        db_table = 'harmonogram'


class Prowadzacy(models.Model):
    id = models.BigAutoField(primary_key=True)
    imie = models.CharField(max_length=30, blank=True, null=True)
    nazwisko = models.CharField(max_length=30, blank=True, null=True)
    rola = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'prowadzacy'