from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InternalProjectViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'projects', InternalProjectViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
