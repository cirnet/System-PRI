from django.db import models
from django.contrib.postgres.fields import ArrayField

class User(models.Model):
    login = models.CharField(primary_key=True, max_length=20)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    person = models.ForeignKey('Person', on_delete=models.DO_NOTHING)

class Person(models.Model):
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    class Role(models.IntegerChoices):
        Koordynator = 0
        Opiekun = 1
        Student = 2

    role = models.IntegerField(choices=Role.choices)

class CommissionParticipation(models.Model):
    person = models.ForeignKey('Person', on_delete=models.DO_NOTHING, related_name="commission_participations")
    commission = models.ForeignKey('Commission', on_delete=models.DO_NOTHING)

class Commission(models.Model):
    time_start = models.TimeField()
    time_end = models.TimeField()
    is_complete = models.BooleanField()

class Defense(models.Model):
    defense_date = models.DateField()
    commission = models.ForeignKey('Commission', on_delete=models.CASCADE)
    team = models.ForeignKey('Team', on_delete=models.DO_NOTHING)
    time_start = models.TimeField()

    class defense_type(models.IntegerChoices):
        defense_half = 0
        defense_full = 1

    defense_type = models.IntegerField(choices=defense_type.choices)
    grade = models.IntegerField()

class AvailableTimeSlot(models.Model):
    person = models.ForeignKey('Person', on_delete=models.DO_NOTHING)
    time_start = models.TimeField()
    time_end = models.TimeField()

class Team(models.Model):
    name = models.CharField(max_length=100)
    supervisor = models.ForeignKey('Person', on_delete=models.DO_NOTHING) #Opiekun projektu
    project = models.ForeignKey('Project', on_delete=models.DO_NOTHING)

class Project(models.Model):
    topic = models.CharField(max_length=100)
    grade_card = models.ForeignKey('ProjectGradeCard', on_delete=models.DO_NOTHING)

class ProjectGradeCard(models.Model):
    pass