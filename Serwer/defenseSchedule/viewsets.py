from rest_framework import viewsets

from . import models
from . import serializers

class UserViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class CommissionViewset(viewsets.ModelViewSet):
    queryset = models.Commission.objects.all()
    serializer_class = serializers.CommissionSerializer

class CommissionParticipationViewset(viewsets.ModelViewSet):
    queryset = models.CommissionParticipation.objects.all()
    serializer_class = serializers.CommissionParticipationSerializer

class DefenseViewset(viewsets.ModelViewSet):
    queryset = models.Defense.objects.all()
    serializer_class = serializers.DefenseSerializer

class AvailableTimeSlotViewset(viewsets.ModelViewSet):
    queryset = models.AvailableTimeSlot.objects.all()
    serializer_class = serializers.AvailableTimeSlotSerializer

class TeamViewset(viewsets.ModelViewSet):
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer

class ProjectViewset(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

class ProjectGradeCardViewset(viewsets.ModelViewSet):
    queryset = models.ProjectGradeCard.objects.all()
    serializer_class = serializers.ProjectGradeCardSerializer