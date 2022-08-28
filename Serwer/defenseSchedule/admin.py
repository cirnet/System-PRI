from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Person)
admin.site.register(CommissionParticipation)
admin.site.register(Commission)
admin.site.register(Defense)
admin.site.register(AvailableTimeSlot)
admin.site.register(Team)
admin.site.register(Project)
admin.site.register(ProjectGradeCard)