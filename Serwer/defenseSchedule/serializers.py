from rest_framework import serializers
from .models import *
from required import Requires, R

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
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
    REQUIREMENTS = (
        Requires("time_end", "time_start") +
        Requires("time_end", R("time_end") > R("time_start"))
     )

    def validate(self, data):
        self.REQUIREMENTS.validate(data)  # handle validation error

        return data

    class Meta:
        model = AvailableTimeSlot
        fields = '__all__'

class AvailableTimeSlotSerializerCreate(serializers.ModelSerializer):
    REQUIREMENTS = (
        Requires("time_end", "time_start") +
        Requires("time_end", R("time_end") > R("time_start"))
     )

    def validate(self, data):
        self.REQUIREMENTS.validate(data)  # handle validation error

        return data

    class Meta:
        model = AvailableTimeSlot
        fields = ['time_start', 'time_end']

class CoordinatorTimeSlotSerializer(serializers.ModelSerializer):
    REQUIREMENTS = (
        Requires("time_end", "time_start") +
        Requires("time_end", R("time_end") > R("time_start"))
     )

    def validate(self, data):
        self.REQUIREMENTS.validate(data)  # handle validation error

        return data

    class Meta:
        model = CoordinatorTimeSlot
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectCardEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCardEvaluation
        fields = '__all__'

class ProjectGradeCardSerializer(serializers.ModelSerializer):
    grades = ProjectCardEvaluationSerializer(many=True, read_only=False)
    class Meta:
        model = ProjectGradeCard
        fields = '__all__'
