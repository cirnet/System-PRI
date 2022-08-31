from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
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


class User(AbstractBaseUser):
    username = None
    login = models.CharField(primary_key=True, max_length=100)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    class Role(models.IntegerChoices):
        Koordynator = 0
        Opiekun = 1
        Student = 2

    role = models.IntegerField(choices=Role.choices, null=True)
    # date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}"

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
    person = models.ForeignKey('User', on_delete=models.DO_NOTHING, related_name="commission_participations")
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
    person = models.ForeignKey('User', on_delete=models.DO_NOTHING)
    time_start = models.TimeField()
    time_end = models.TimeField()

class Team(models.Model):
    name = models.CharField(max_length=100)
    supervisor = models.ForeignKey('User', on_delete=models.DO_NOTHING) #Opiekun projektu
    project = models.ForeignKey('Project', on_delete=models.DO_NOTHING)

class Project(models.Model):
    topic = models.CharField(max_length=100)
    grade_card = models.ForeignKey('ProjectGradeCard', on_delete=models.DO_NOTHING)

class ProjectGradeCard(models.Model):
    pass