from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, timedelta

from .models import Commission, CoordinatorTimeSlot


@receiver(post_save, sender=CoordinatorTimeSlot) # tworzenie komisji dla bloku czasu wyznaczonego przez koordynatora
def create_commission(sender, instance, created, **kwargs):
    print("dlugi print do sprawdzenia blablablablablablabla")
    beginning_time = instance.time_start

    print("dodawanie komisji")

    while(beginning_time < instance.time_end):
        end_time = beginning_time + timedelta(minutes=30)
        commission = Commission()
        commission.time_start = beginning_time
        commission.time_end = end_time
        beginning_time = end_time
        commission.save()
        print("dodano komisje")