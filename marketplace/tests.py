from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Category, Product

class MarketplaceAPITests(APITestCase):
    def setUp(self):
        self.cat1 = Category.objects.create(name="Templates")
        self.cat2 = Category.objects.create(name="Components")
        
        self.p1 = Product.objects.create(
            name="React Template",
            description="A clean template",
            price=29.99,
            category=self.cat1
        )
        self.p2 = Product.objects.create(
            name="Vue Component",
            description="High performance UI",
            price=15.00,
            category=self.cat2
        )
        self.url = reverse('product-list')

    def test_filter_by_category(self):
        response = self.client.get(self.url, {'category': self.cat1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Handle DRF pagination if present (usually results key) or direct list
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], "React Template")

    def test_search_products(self):
        response = self.client.get(self.url, {'search': 'Vue'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], "Vue Component")
