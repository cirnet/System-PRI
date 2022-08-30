from django.contrib import admin
from django.urls import path, include, re_path
from .router import router
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    re_path(r'^$', schema_view)
]