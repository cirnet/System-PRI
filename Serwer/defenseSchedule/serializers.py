from rest_framework import serializers
from .models import Leaders, DefenseSchedule, Students

class LeadersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaders
        fields = '__all__'



class DefenseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefenseSchedule
        fields = '__all__'


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'