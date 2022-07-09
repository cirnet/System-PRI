from rest_framework import serializers
from .models import Leaders, DefenseSchedule

class LeadersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaders
        fields = '__all__'



class DefenseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefenseSchedule
        fields = '__all__'