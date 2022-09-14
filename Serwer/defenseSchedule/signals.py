from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from datetime import datetime, timedelta

from .models import Commission, CoordinatorTimeSlot, AvailableTimeSlot, CommissionParticipation


@receiver(post_save, sender=CoordinatorTimeSlot) # tworzenie komisji dla bloku czasu wyznaczonego przez koordynatora
def create_commission(sender, instance, created, **kwargs):
    
    beginning_time = instance.time_start

    while(beginning_time < instance.time_end):
        end_time = beginning_time + timedelta(minutes=30)
        commission = Commission()
        commission.time_start = beginning_time
        commission.time_end = end_time
        beginning_time = end_time
        commission.save()
        print("dodano komisje")

@receiver(post_delete, sender=CoordinatorTimeSlot)
def delete_commission(sender, instance, **kwargs):
    commissions = Commission.objects.filter(
        time_start__gte=instance.time_start).filter(
        time_end__lte=instance.time_end)
    commissions.delete()


@receiver(pre_save, sender=AvailableTimeSlot)
def create_timeslots(sender, instance, **kwargs):
    coordinator_timeslots = CoordinatorTimeSlot.objects.all()

    # for ct in coordinator_timeslots:
    #     if(instance.time_start > ct.time_start and instance.time_start < ct.time_end):
    #         pass # return ??
    #     else:
    #         raise Exception('Wybrany czas nie pasuje do czasu wyznaczonego przez koordynatora')

@receiver(post_save, sender=AvailableTimeSlot)
def create_commission_participation(sender, instance, **kwargs):
    #coordinator_timeslots = CoordinatorTimeSlot.objects.all()
    pass
    #is_complete = true jeśli dodawany członek komisji jest 4
    comm_parts = CommissionParticipation.objects.filter(commission__time_start__exact=instance.time_start).count()
    # ^ tu brakuje dodatkowego warunku na sprawdzenie dnia
    print(f"Oto liczbaaaaaaaa: {comm_parts}")
    if(comm_parts >= 4):
        instance.is_complete = True
    # cp = CommissionParticipation(person=sender.person) #stworzenie karty oceny projektu i przypisanie jej projektu
    # cp.save()

@receiver(post_delete, sender=AvailableTimeSlot)
def delete_commission_participation(sender, instance, **kwargs):
    pass