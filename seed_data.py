import os
import django
import sys

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from portfolio.models import Project
from blog.models import BlogPost, Tag
from marketplace.models import Category, Product

User = get_user_model()

def seed_data():
    print("Seeding data...")
    
    # 1. Create Superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Superuser created: admin / admin123")

    user = User.objects.first()

    # 2. Portfolio Projects
    Project.objects.get_or_create(
        title="Eco-Track Dashboard",
        description="A real-time environmental monitoring dashboard built with React and Django.",
        technologies=["React", "Django", "Chart.js", "PostgreSQL"],
        github_link="https://github.com",
    )
    Project.objects.get_or_create(
        title="SecurePay API",
        description="A robust payment gateway integration service with military-grade encryption.",
        technologies=["Python", "Django REST", "Redis", "Docker"],
        github_link="https://github.com",
    )
    print("Projects seeded.")

    # 3. Blog Posts
    tag_eng, _ = Tag.objects.get_or_create(name="Engineering")
    tag_ui, _ = Tag.objects.get_or_create(name="UI Design")
    
    post, created = BlogPost.objects.get_or_create(
        title="The Art of Uncodixified UI",
        slug="art-of-uncodixified-ui",
        content="This post explores why 'Normal UI' is superior to the generic AI aesthetic. We look at Linear, Stripe, and GitHub as benchmarks for quality...",
        author=user,
        is_published=True
    )
    if created:
        post.tags.add(tag_eng, tag_ui)
    
    print("Blog posts seeded.")

    # 4. Marketplace Products
    cat_templates, _ = Category.objects.get_or_create(name="Templates", slug="templates")
    Product.objects.get_or_create(
        name="Clean Portfolio Template",
        description="A minimalist portfolio template built with React and Tailwind CSS v4. No fluff.",
        price=49.00,
        category=cat_templates,
        stock=100
    )
    # 5. Ratings
    from contact.models import Rating
    Rating.objects.get_or_create(
        name="Sarah Jenkins",
        stars=5,
        comment="Absolutely phenomenal developer. Deployed a full-scale e-commerce system in record time."
    )
    Rating.objects.get_or_create(
        name="David K.",
        stars=5,
        comment="Silas built a custom Django & React dashboard for our clinic. Extremely robust security."
    )
    Rating.objects.get_or_create(
        name="Elena Rostova",
        stars=5,
        comment="Beautiful UI, fast load times, and no unnecessary bloat. Highly recommended!"
    )
    print("Ratings seeded.")
    print("All data seeded successfully!")

if __name__ == "__main__":
    seed_data()
