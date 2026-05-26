from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Project
from .serializers import ProjectSerializer
from .cv_chat import generate_chat_response
from core.mongodb import get_mongodb_db, sync_projects_to_mongodb

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        db = get_mongodb_db()
        if db is not None:
            try:
                # Automatically sync sqlite seed data to MongoDB first if collection is empty
                projects_col = db["projects"]
                if projects_col.count_documents({}) == 0:
                    sync_projects_to_mongodb()
                
                # Fetch projects from MongoDB projects collection
                mongo_projects = list(projects_col.find({}, {"_id": 0}))
                if mongo_projects:
                    return Response(mongo_projects, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"MongoDB fetch failed: {e}")
        return super().get(request, *args, **kwargs)

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        db = get_mongodb_db()
        if db is not None:
            try:
                pk = kwargs.get('pk')
                project_data = db["projects"].find_one({"id": int(pk)}, {"_id": 0})
                if project_data:
                    return Response(project_data, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"MongoDB detail fetch failed: {e}")
        return super().get(request, *args, **kwargs)

class ProjectBySlugView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'

    def get(self, request, *args, **kwargs):
        db = get_mongodb_db()
        if db is not None:
            try:
                slug = kwargs.get('slug')
                project_data = db["projects"].find_one({"slug": slug}, {"_id": 0})
                if project_data:
                    return Response(project_data, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"MongoDB slug fetch failed: {e}")
        return super().get(request, *args, **kwargs)


class CVChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        messages = request.data.get("messages", [])
        user_message = request.data.get("message", "")
        
        if not user_message:
            return Response(
                {"error": "Message is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            chat_response = generate_chat_response(messages, user_message)
            return Response(chat_response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

