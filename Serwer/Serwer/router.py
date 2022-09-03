from rest_framework import routers
from defenseSchedule.viewsets import *

studentprefix = "student/"


router = routers.DefaultRouter()
router.register('user', MyUserViewset, basename='user')
router.register('commission', CommissionViewset)
router.register('commission-participation', CommissionParticipationViewset, basename='commission-participation')
router.register('defense', DefenseViewset)
router.register('available-time-slot', AvailableTimeSlotViewset)
router.register('team', TeamViewset)
router.register('project', ProjectViewset)
router.register(f'{studentprefix}project-grade-card', ProjectGradeCardViewset)