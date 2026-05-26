from django.contrib import admin
from .models import InternalProject, Task

@admin.register(InternalProject)
class InternalProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'progress', 'deadline', 'updated_at')
    list_filter = ('status',)
    search_fields = ('name', 'description')
    filter_horizontal = ('team',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'status', 'priority', 'assigned_to', 'due_date')
    list_filter = ('status', 'priority', 'project')
    search_fields = ('title', 'description')
