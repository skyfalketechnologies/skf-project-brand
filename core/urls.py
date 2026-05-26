from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.http import JsonResponse

from contact.views import ContactMessageCreateView, ScheduleRequestCreateView, RatingListCreateView

# Customizing Admin Site Headers
admin.site.site_header = "Silvora Labs Admin"
admin.site.site_title = "Silvora Labs Admin Portal"
admin.site.index_title = "Welcome to Silvora Labs Admin"

def api_root(request):
    return JsonResponse({
        "message": "Silvora Labs API is running",
        "endpoints": {
            "admin": "/admin/",
            "projects": "/api/projects/",
            "blog": "/api/blog/",
            "marketplace": "/api/marketplace/",
            "contact": "/api/contact/",
            "ratings": "/api/ratings/",
            "schedule": "/api/schedule/",
            "analytics": "/api/analytics/dashboard/",
            "management": "/api/management/",
        }
    })

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/projects/', include('portfolio.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/marketplace/', include('marketplace.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/ratings/', RatingListCreateView.as_view(), name='ratings-list-create'),
    path('api/schedule/', ScheduleRequestCreateView.as_view(), name='schedule-create'),
    path('api/analytics/', include('analytics.urls')),
    path('api/management/', include('management.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Production serving of media files (fallback for Render)
if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]
