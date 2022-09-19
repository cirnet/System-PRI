from django.core.exceptions import ValidationError
from django.db import models
from datetime import datetime
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

def fixed_time(hour):
        time_now = datetime.now()
        time_fixed = time_now.replace(hour=hour, minute=0, second=0, microsecond=0)
        return time_fixed

class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    team_membership = models.ForeignKey('Team', on_delete=models.DO_NOTHING, null=True) #członek jakiego zespołu

    objects = MyUserManager()

    USERNAME_FIELD = 'email'

    #REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class CommissionParticipation(models.Model):
    person = models.ForeignKey('MyUser', on_delete=models.DO_NOTHING, related_name="commission_participations")
    commission = models.ForeignKey('Commission', on_delete=models.DO_NOTHING)

    def __str__(self):
        start_time = self.commission.time_start.time()
        end_time = self.commission.time_end.time()
        
        return f'{start_time.strftime("%H:%M")} - {end_time.strftime("%H:%M")}'

class Commission(models.Model):
    members = models.ManyToManyField('MyUser', through='CommissionParticipation') 
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()
    is_complete = models.BooleanField(default=False) #czy komisja ma odpowiednią ilość członków - 4
    is_accepted = models.BooleanField(default=False) #czy komisja została zaakceptowana przez koordynatora
    is_selected = models.BooleanField(default=False) #czy komisja została wybrana przez zespół studentów

    def delete(self, *args, **kwargs): #obsługa usuwania CommissionParticipation
        self.members.clear()
        super().delete(*args, **kwargs)

    def __str__(self):
        start_time = self.time_start.time()
        end_time = self.time_end.time()
        
        return f'{start_time.strftime("%H:%M")} - {end_time.strftime("%H:%M")}'

class Defense(models.Model):
    defense_date = models.DateField()
    commission = models.ForeignKey('Commission', on_delete=models.CASCADE)
    team = models.ForeignKey('Team', on_delete=models.DO_NOTHING)
    time_start = models.DateTimeField()

    class defense_type(models.IntegerChoices):
        defense_half = 0
        defense_full = 1

    defense_type = models.IntegerField(choices=defense_type.choices)
    grade = models.IntegerField()

class AvailableTimeSlot(models.Model):
    person = models.ForeignKey('MyUser', on_delete=models.DO_NOTHING)
    time_start = models.DateTimeField(default=fixed_time(8))
    time_end = models.DateTimeField(default=fixed_time(10))

    def __str__(self):
        start_time = self.time_start.time()
        end_time = self.time_end.time()
        
        return f'{start_time.strftime("%H:%M")} - {end_time.strftime("%H:%M")}'

    def save(self, **kwargs):
        chosen_commission_participations = CommissionParticipation.objects.filter(
        commission__time_start__gte=self.time_start).filter(
        commission__time_end__lte=self.time_end).filter(
        person=self.person)

        print("Oto lista istniejących CommissionParticipation")
        for ccp in chosen_commission_participations:
            print(f"* {ccp}")
        print("\n")

        chosen_commissions = Commission.objects.filter(
        time_start__gte=self.time_start).filter(
        time_end__lte=self.time_end)
        #pobrać istniejące commissions i wybrać tą która zgadza się z time_start
        #TODO Sprawdzić czy komisja już istnieje, jeśli tak to nie dodawać nowej
        for cc in chosen_commissions:
            cp = CommissionParticipation(person=self.person, commission=cc) #stworzenie uczestnictwa w komisji
            if(cp not in chosen_commission_participations):
                print(f"{cp} nie jest w chosen_commission_participations")
                cp.save()
            else:
                print("Znaleziono")

        super(AvailableTimeSlot, self).save(**kwargs)



class CoordinatorTimeSlot(models.Model):
    person = models.ForeignKey('MyUser', on_delete=models.DO_NOTHING)
    time_start = models.DateTimeField(default=fixed_time(6))
    time_end = models.DateTimeField(default=fixed_time(12))
    
    def clean(self):
        if self.time_start > self.time_end:
            raise ValidationError({'time_start': 'Data początkowa nie może być wcześniejsza niż końcowa.'})
        elif self.time_start == self.time_end:
            raise ValidationError({'time_start': 'Daty nie mogą być takie same.'})


    def __str__(self):
        start_time = self.time_start.time()
        end_time = self.time_end.time()

        return f'{start_time.strftime("%H:%M")} - {end_time.strftime("%H:%M")}'

class Team(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=100)
    supervisor = models.ForeignKey('MyUser', on_delete=models.DO_NOTHING) #Opiekun projektu
    project = models.ForeignKey('Project', on_delete=models.DO_NOTHING, null=True, blank=True)

class Project(models.Model):
    topic = models.CharField(max_length=100)
    #grade_card = models.ForeignKey('ProjectGradeCard', on_delete=models.DO_NOTHING, null=True, blank=True)
    grade_card = models.OneToOneField(
        'ProjectGradeCard',
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='project',
    )


    def __str__(self):
        return self.topic
    
    def prepare_pgc_content(self, pgc):
        evaluation_criterias = EvaluationCriteria.objects.all()

        for ec in evaluation_criterias:
            pce = ProjectCardEvaluation()
            pce.criteria = ec
            pce.project_card = pgc
            pce.save()

    def save(self, **kwargs):
        pgc = ProjectGradeCard(project=self) #stworzenie karty oceny projektu i przypisanie jej projektu
        pgc.save()
        self.grade_card = pgc
        self.prepare_pgc_content(pgc)
        super(Project, self).save(**kwargs)


class ProjectGradeCard(models.Model):
    #topic = models.CharField(max_length=100)
    #project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='grade_card')
    members = models.ManyToManyField('EvaluationCriteria', through='ProjectCardEvaluation')

    def __str__(self):
        return self.project.topic

class EvaluationCriteria(models.Model):
    class EvaluationCategories(models.TextChoices):
        PRESENTATION = 'presentation', 'Prezentacja'
        DOCUMENTATION = 'documentation', 'Dokumentacja'
        TEAMWORK = 'teamwork', 'Praca grupy w semestrze'
        PROJECT_PRODUCTS = 'project-products', 'Produkty projektu'

    category = models.CharField(
        max_length=25,
        choices=EvaluationCategories.choices,
        default=EvaluationCategories.PRESENTATION,
    )

    name = models.CharField("Nazwa", max_length=200)
    weight_1 = models.IntegerField("Waga I Semestr")
    weight_2 = models.IntegerField("Waga II Semestr")
    contribution_1 = models.FloatField("Udział 1")
    contribution_2 = models.FloatField("Udział 2")
    description = models.TextField("Opis kryterium", max_length=500)

    def __str__(self):
        return self.name

class ProjectCardEvaluation(models.Model):
    criteria = models.ForeignKey(EvaluationCriteria, on_delete=models.DO_NOTHING)
    project_card = models.ForeignKey(ProjectGradeCard, on_delete=models.DO_NOTHING)
    points_1 = models.IntegerField(null=True, blank=True)
    points_2 = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.criteria.name