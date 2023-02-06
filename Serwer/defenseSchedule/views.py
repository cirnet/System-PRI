from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.settings import api_settings

def index(request):
    print(api_settings.DEFAULT_AUTHENTICATION_CLASSES)
    return HttpResponse("Miejsce do testowania.")
