from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, TagListView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('tags/', TagListView.as_view(), name='tag-list'),
    path('<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
]
