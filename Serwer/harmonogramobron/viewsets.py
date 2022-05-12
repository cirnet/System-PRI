from rest_framework import viewsets

from . import models
from . import serializers

class ProwadzacyViewset(viewsets.ModelViewSet):
    queryset = models.Prowadzacy.objects.all()
    serializer_class = serializers.ProwadzacySerializer

class HarmonogramViewset(viewsets.ModelViewSet):
    queryset = models.Harmonogram.objects.all()
    serializer_class = serializers.HarmonogramSerializer