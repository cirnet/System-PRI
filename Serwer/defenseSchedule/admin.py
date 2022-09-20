from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django.core.exceptions import ValidationError

from .models import MyUser, CommissionParticipation, Commission, Defense, AvailableTimeSlot, Team, Project, ProjectGradeCard, EvaluationCriteria, ProjectCardEvaluation, CoordinatorTimeSlot
from .forms import UserChangeForm, UserCreationForm, ProjectForm

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'is_admin', 'group_name')

    def group_name(self, obj):
            return obj.groups.values_list('name',flat=True).get()

    group_name.short_description = 'Grupa'

    list_filter = ('is_admin',)
    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'team_membership')}),
        ('Permissions', {'fields': ('is_admin','groups')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}),
        ('Permissions', {'fields': ('is_admin','groups')})
    )
    search_fields = ('email',)
    ordering = ('email',)
    #filter_horizontal = ()



class ProjectAdmin(admin.ModelAdmin):
    exclude = ['grade_card']
    form = ProjectForm


class ProjectCardEvaluationInline(admin.TabularInline):
    model = ProjectCardEvaluation

class ProjectGradeCardAdmin(admin.ModelAdmin):
    inlines = [
        ProjectCardEvaluationInline,
    ]


class EvaluationCriteriaAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')


class TeamInline(admin.TabularInline):
    model = MyUser
    fields = ('email',)
    readonly_fields = ('email',)

class TeamAdmin(admin.ModelAdmin):
    inlines = [
        TeamInline,
    ]

class CoordinatorTimeSlotAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'person')
    ordering = ['time_start']

    def initial_form_data(self, request):
        return {'person': request.user}

class AvailableTimeSlotAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'person')
    ordering = ['time_start']
    
class CommissionParticipationInline(admin.TabularInline):
    model = CommissionParticipation
    extra = 1
    

class CommissionAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_valid', 'is_complete', 'is_accepted', 'is_selected')
    ordering = ['time_start']

    inlines = [
        CommissionParticipationInline,
    ]

class CommissionParticipationAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'person')
    ordering = ['-commission__time_start']

# Now register the new UserAdmin...
admin.site.register(MyUser, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
#admin.site.unregister(Group)
admin.site.register(CommissionParticipation, CommissionParticipationAdmin)
admin.site.register(Commission, CommissionAdmin)
admin.site.register(Defense)
admin.site.register(CoordinatorTimeSlot, CoordinatorTimeSlotAdmin)
admin.site.register(AvailableTimeSlot, AvailableTimeSlotAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectGradeCard, ProjectGradeCardAdmin)
admin.site.register(EvaluationCriteria, EvaluationCriteriaAdmin)
#admin.site.register(ProjectCardEvaluation)