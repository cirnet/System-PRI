from rest_framework import viewsets

from . import models
from . import serializers

class LeadersViewset(viewsets.ModelViewSet):
    queryset = models.Leaders.objects.all()
    serializer_class = serializers.LeadersSerializer

class DefenseScheduleViewset(viewsets.ModelViewSet):
    queryset = models.DefenseSchedule.objects.all()
    serializer_class = serializers.DefenseScheduleSerializer