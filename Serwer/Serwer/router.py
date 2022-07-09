from rest_framework import routers
from defenseSchedule.viewsets import LeadersViewset, DefenseScheduleViewset, StudentsViewset

router = routers.DefaultRouter()
router.register('leaders', LeadersViewset)
router.register('defenseSchedule', DefenseScheduleViewset)
router.register('students', DefenseScheduleViewset)
