from rest_framework import serializers
from .models import InternalProject, Task
from django.contrib.auth import get_user_model

User = get_user_model()

class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserMinimalSerializer(source='assigned_to', read_only=True)
    
    class Meta:
        model = Task
        fields = '__all__'

class InternalProjectSerializer(serializers.ModelSerializer):
    team_details = UserMinimalSerializer(source='team', many=True, read_only=True)
    client_details = UserMinimalSerializer(source='client', read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='client',
        required=False,
        allow_null=True
    )
    task_count = serializers.IntegerField(source='tasks.count', read_only=True)
    completed_task_count = serializers.SerializerMethodField()
    
    class Meta:
        model = InternalProject
        fields = '__all__'

    def get_completed_task_count(self, obj):
        return obj.tasks.filter(status='done').count()
