from django.urls import path
from .views import ProjectListView, ProjectDetailView, ProjectBySlugView, CVChatView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('cv-chat/', CVChatView.as_view(), name='cv-chat'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('u/<slug:slug>/', ProjectBySlugView.as_view(), name='project-by-slug'),
]

