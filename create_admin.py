import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

username = 'admin'
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@silvoralabs.local')
first_name = 'Admin'
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

if not User.objects.filter(username=username).exists():
    user = User.objects.create_superuser(username, email, password)
    user.role = 'admin'
    user.first_name = first_name
    user.save()
    print(f"Superuser '{username}' created (password: admin123 unless DJANGO_SUPERUSER_PASSWORD is set).")
else:
    user = User.objects.get(username=username)
    user.set_password(password)
    user.role = 'admin'
    user.is_staff = True
    user.is_superuser = True
    user.first_name = first_name
    user.email = email
    user.save()
    print(f"Superuser '{username}' updated (password reset to admin123 unless env override).")
