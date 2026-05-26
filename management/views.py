from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import InternalProject, Task
from .serializers import InternalProjectSerializer, TaskSerializer

class InternalProjectViewSet(viewsets.ModelViewSet):
    queryset = InternalProject.objects.all()
    serializer_class = InternalProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role in ['admin', 'project_manager', 'viewer']:
            return InternalProject.objects.all()
        elif user.role == 'client':
            return InternalProject.objects.filter(client=user)
        # Developers see projects they are assigned to
        return InternalProject.objects.filter(team=user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role in ['admin', 'project_manager', 'viewer']:
            return Task.objects.all()
        elif user.role == 'client':
            return Task.objects.filter(project__client=user)
        # Developers see tasks assigned to them or tasks belonging to their team projects
        return Task.objects.filter(Q(assigned_to=user) | Q(project__team=user))
