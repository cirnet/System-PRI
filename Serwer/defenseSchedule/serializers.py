from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commission
        fields = '__all__'

class CommissionParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommissionParticipation
        fields = '__all__'

class DefenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defense
        fields = '__all__'

class AvailableTimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTimeSlot
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectGradeCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectGradeCard
        fields = '__all__'






