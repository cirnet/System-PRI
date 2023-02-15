from rest_framework import viewsets

from . import models
from . import serializers

class MyUserViewset(viewsets.ModelViewSet):
    queryset = models.MyUser.objects.all()
    serializer_class = serializers.MyUserSerializer

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
    serializer_class = serializers.AvailableTimeSlotSerializerCreate
    # queryset = models.AvailableTimeSlot.objects.all()
    # def create(self, request):
    #     result = super().create(request)
    #     print(result)
    #     current_user = request.user
    #     result.person = current_user
    #     result.save()
    #     return result

    def get_queryset(self):
        user = self.request.user
 #        queryset = models.AvailableTimeSlot.objects.all()
 #       if(user.is_authenticated):
        queryset = models.AvailableTimeSlot.objects.filter(person=user)
        return queryset
    

    def perform_create(self, serializer):
        serializer.save(person=self.request.user)

class CoordinatorTimeSlotViewset(viewsets.ModelViewSet):
    queryset = models.CoordinatorTimeSlot.objects.all()
    serializer_class = serializers.CoordinatorTimeSlotSerializer

    def create(self, request):
        result = super().create(request)
        print(result)
        current_user = request.user
        return result

class TeamViewset(viewsets.ModelViewSet):
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer

class ProjectViewset(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

class ProjectGradeCardViewset(viewsets.ModelViewSet):
    queryset = models.ProjectGradeCard.objects.all()
    serializer_class = serializers.ProjectGradeCardSerializer