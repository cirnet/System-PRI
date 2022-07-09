from django.db import models
from django.contrib.postgres.fields import ArrayField

class DefenseSchedule(models.Model):
    id = models.BigAutoField(primary_key=True)
    schedule = ArrayField(models.CharField(max_length=200), blank=True)
    leader = models.TextField(max_length=50, blank=True, null=True)
    class Meta:
        managed = True
        db_table = 'defense_schedule'


class Leaders(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=30, blank=True, null=True)
    role = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'leaders'

class Students(models.Model):
    index_number = models.CharField(max_length=8, blank=True, null=True)
    group = models.CharField(max_length=30, blank=True, null=True)
    defense_schedule = models.CharField(max_length=200, blank=True, null=True)
    skills =  ArrayField(models.CharField(max_length=200), blank=True)
    leader = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'students'