from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from datetime import datetime, timedelta
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q


from .models import Commission, CoordinatorTimeSlot, AvailableTimeSlot, CommissionParticipation, Defense

@receiver(pre_save, sender=CoordinatorTimeSlot)
def validate_commission(sender, instance, **kwargs):

    created = (instance.pk==None)
    if(created):
        return

    # Aktualizujemy istniejący slot
    existing_coordinator_time_slot = CoordinatorTimeSlot.objects.get(pk=instance.pk)

    invalid_commissions = Commission.objects.filter(
        Q(time_start__lte=instance.time_start) | Q(time_end__gte=instance.time_end))

    for ic in invalid_commissions:
        ic.is_valid = False
        ic.save()

@receiver(post_save, sender=CoordinatorTimeSlot) # tworzenie obiektów Commission dla bloku czasu wyznaczonego przez koordynatora
def create_commission(sender, instance, created, **kwargs):
    
    beginning_time = instance.time_start

    used_time_slots = set()

    existing_commissions = Commission.objects.filter(
    time_start__gte=instance.time_start).filter(
    time_end__lte=instance.time_end)

    for ec in existing_commissions:
        used_time_slots.add(ec.time_start)

    while(beginning_time < instance.time_end):
        end_time = beginning_time + timedelta(minutes=30)
        if beginning_time in used_time_slots:
            beginning_time = end_time
            continue

        commission = Commission()
        commission.time_start = beginning_time
        commission.time_end = end_time
        beginning_time = end_time
        commission.save()
        print("dodano komisje")
        

@receiver(post_delete, sender=CoordinatorTimeSlot)
def delete_commission(sender, instance, **kwargs):

    existing_coordinator_time_slots = CoordinatorTimeSlot.objects.filter(person=instance.person)
    
    persistent_commissions_ids = set()

    for ects in existing_coordinator_time_slots:
        commissions_ids = Commission.objects.filter(
        time_start__gte=ects.time_start).filter(
        time_end__lte=ects.time_end).values_list('id', flat=True) 

        persistent_commissions_ids = persistent_commissions_ids.union(set(commissions_ids))
    
    commissions = Commission.objects.filter(
        time_start__gte=instance.time_start).filter(
        time_end__lte=instance.time_end).filter(~Q(id__in=persistent_commissions_ids))
    commissions.delete()


@receiver(pre_save, sender=AvailableTimeSlot)
def create_timeslots(sender, instance, **kwargs):
    pass
    #coordinator_timeslots = CoordinatorTimeSlot.objects.all()

    # for ct in coordinator_timeslots:
    #     if(instance.time_start > ct.time_start and instance.time_start < ct.time_end):
    #         pass # return ??
    #     else:
    #         raise Exception('Wybrany czas nie pasuje do czasu wyznaczonego przez koordynatora')

@receiver(post_save, sender=AvailableTimeSlot)
def create_commission_participation(sender, instance, **kwargs):
    pass
    #coordinator_timeslots = CoordinatorTimeSlot.objects.all()
    #is_complete = true jeśli dodawany członek komisji jest 4
    commissions = Commission.objects.filter(time_start__gte=instance.time_start).filter(time_end__lte=instance.time_end)
    for c in commissions:
        if (c.members.count() > 3):
            c.is_complete=True
            c.save()
    # # ^ tu brakuje dodatkowego warunku na sprawdzenie dnia
    # print(f"Oto liczbaaaaaaaa: {comm_parts}")
    # if(comm_parts >= 4):
    #     instance.is_complete = True
    # cp = CommissionParticipation(person=sender.person) #stworzenie karty oceny projektu i przypisanie jej projektu
    # cp.save()

@receiver(post_delete, sender=AvailableTimeSlot)
def delete_commission_participation(sender, instance, **kwargs):
    
    existing_available_time_slots = AvailableTimeSlot.objects.filter(person=instance.person)
    
    persistent_commission_participations_ids = set()

    for eats in existing_available_time_slots:
        commissions_ids = CommissionParticipation.objects.filter(
        person=instance.person).filter(
        commission__time_start__gte=eats.time_start).filter(
        commission__time_end__lte=eats.time_end).values_list('id', flat=True) 

        persistent_commission_participations_ids = persistent_commission_participations_ids.union(set(commissions_ids))
    
    commission_participations = CommissionParticipation.objects.filter(
        person=instance.person).filter(
        commission__time_start__gte=instance.time_start).filter(
        commission__time_end__lte=instance.time_end).filter(~Q(id__in=persistent_commission_participations_ids))
    commission_participations.delete()

@receiver(post_save, sender=Defense)
def commission_selected(sender, instance, **kwargs):
    selected_commission = Commission.objects.get(pk=instance.commission.pk)
    print(selected_commission)
    selected_commission.is_selected = True
    selected_commission.save()

@receiver(pre_save, sender=Defense)
def commission_selected(sender, instance, **kwargs):
    existing_defense = Defense.objects.get(pk=instance.pk)
    selected_commission = Commission.objects.get(pk=existing_defense.commission.pk)
    print(selected_commission)
    selected_commission.is_selected = False
    selected_commission.save()