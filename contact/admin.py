from django.contrib import admin
from .models import ContactMessage, ScheduleRequest, Rating

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'email', 'created_at', 'is_read')
    list_filter = ('is_read',)
    search_fields = ('name', 'email', 'subject', 'message')

@admin.register(ScheduleRequest)
class ScheduleRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'date', 'time', 'created_at')
    list_filter = ('date',)
    search_fields = ('name', 'email', 'phone')

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('name', 'stars', 'created_at')
    list_filter = ('stars',)
    search_fields = ('name', 'comment')
