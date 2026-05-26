from rest_framework import generics, permissions
from .models import ContactMessage, ScheduleRequest, Rating
from .serializers import ContactMessageSerializer, ScheduleRequestSerializer, RatingSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = (permissions.AllowAny,)


class ScheduleRequestCreateView(generics.CreateAPIView):
    queryset = ScheduleRequest.objects.all()
    serializer_class = ScheduleRequestSerializer
    permission_classes = (permissions.AllowAny,)


class RatingListCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (permissions.AllowAny,)
