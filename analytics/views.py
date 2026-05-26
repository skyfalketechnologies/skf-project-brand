from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count
from django.db.models.functions import TruncDate
from datetime import timedelta
from django.utils import timezone
from .models import PageView

class AnalyticsDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Total views
        total_views = PageView.objects.count()

        # Views by path
        path_stats = PageView.objects.values('path').annotate(
            views=Count('id')
        ).order_by('-views')[:10]

        # Views over last 7 days
        seven_days_ago = timezone.now().date() - timedelta(days=7)
        daily_stats = PageView.objects.filter(
            timestamp__date__gte=seven_days_ago
        ).annotate(
            date=TruncDate('timestamp')
        ).values('date').annotate(
            views=Count('id')
        ).order_by('date')

        return Response({
            "total_views": total_views,
            "path_stats": path_stats,
            "daily_stats": daily_stats,
        })
