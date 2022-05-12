from rest_framework import routers
from harmonogramobron.viewsets import ProwadzacyViewset, HarmonogramViewset

router = routers.DefaultRouter()
router.register('prowadzacy', ProwadzacyViewset)
router.register('harmonogram', HarmonogramViewset)
