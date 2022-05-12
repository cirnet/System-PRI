from django.db import models

class Harmonogram(models.Model):
    id = models.BigAutoField(primary_key=True)
    czas_start = models.DateTimeField(blank=True, null=True)
    czas_koniec = models.DateTimeField(blank=True, null=True)
    typ = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'harmonogram'


class Prowadzacy(models.Model):
    id = models.BigAutoField(primary_key=True)
    imie = models.CharField(max_length=30, blank=True, null=True)
    nazwisko = models.CharField(max_length=30, blank=True, null=True)
    rola = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'prowadzacy'