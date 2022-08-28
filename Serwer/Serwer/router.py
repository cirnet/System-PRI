from rest_framework import routers
from defenseSchedule.viewsets import PersonViewset

router = routers.DefaultRouter()
router.register('person', PersonViewset)
