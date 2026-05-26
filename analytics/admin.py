from django.contrib import admin
from .models import PageView

@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ('path', 'timestamp', 'ip_address')
    list_filter = ('path',)
    search_fields = ('path', 'ip_address', 'user_agent')
