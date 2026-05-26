from rest_framework import serializers
from .models import ContactMessage, ScheduleRequest, Rating

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ('is_read', 'created_at')


class ScheduleRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleRequest
        fields = '__all__'
        read_only_fields = ('created_at',)


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
        read_only_fields = ('created_at',)
