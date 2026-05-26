from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import PageView
from django.contrib.auth import get_user_model

User = get_user_model()

class AnalyticsTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.dashboard_url = reverse('analytics-dashboard')

    def test_middleware_records_view(self):
        # Visit home page (triggering middleware)
        self.client.get('/api/projects/')
        
        # Check if PageView was created
        self.assertEqual(PageView.objects.count(), 1)
        view = PageView.objects.first()
        self.assertEqual(view.path, '/api/projects/')

    def test_dashboard_aggregation(self):
        # Create some page views
        PageView.objects.create(path='/p1', ip_address='127.0.0.1')
        PageView.objects.create(path='/p1', ip_address='127.0.0.1')
        PageView.objects.create(path='/p2', ip_address='127.0.0.1')

        response = self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_views'], 3)
        
        # Check path stats
        p1_stats = next(item for item in response.data['path_stats'] if item["path"] == "/p1")
        self.assertEqual(p1_stats['views'], 2)
