from rest_framework import serializers
from .models import Prowadzacy, Harmonogram

class ProwadzacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Prowadzacy
        fields = '__all__'



class HarmonogramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Harmonogram
        fields = '__all__'