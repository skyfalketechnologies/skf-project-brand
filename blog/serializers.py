from rest_framework import serializers
from .models import BlogPost, Tag
from accounts.serializers import UserSerializer

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        read_only_fields = ('id', 'slug')

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    read_time = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'content', 'cover_image', 'author', 'tags', 
                  'created_at', 'updated_at', 'is_published', 'meta_description', 
                  'meta_keywords', 'read_time')
        read_only_fields = ('slug', 'created_at', 'updated_at', 'author')
