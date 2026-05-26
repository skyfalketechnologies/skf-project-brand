from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from management.models import InternalProject, Task
import datetime

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds mock project tracker users, client linkages, and milestone tasks'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Seeding project tracker sandbox dataset...'))

        # 1. Clear existing tracker records to keep clean state
        Task.objects.all().delete()
        InternalProject.objects.all().delete()

        # Roster of users to seed
        user_roster = [
            {'username': 'admin_silvora', 'email': 'admin.silvora@gmail.com', 'first_name': 'System', 'last_name': 'Admin', 'role': 'admin'},
            {'username': 'pm_silas', 'email': 'pm.silas@gmail.com', 'first_name': 'Silas', 'last_name': 'Kipkemoi (PM)', 'role': 'project_manager'},
            {'username': 'dev_alex', 'email': 'dev.alex@gmail.com', 'first_name': 'Alex', 'last_name': 'Developer', 'role': 'developer'},
            {'username': 'dev_sarah', 'email': 'dev.sarah@gmail.com', 'first_name': 'Sarah', 'last_name': 'Developer', 'role': 'developer'},
            {'username': 'client_silas', 'email': 'client.silas@gmail.com', 'first_name': 'Silas', 'last_name': 'Client (AI Builder)', 'role': 'client'},
            {'username': 'client_dairy', 'email': 'client.dairy@gmail.com', 'first_name': 'Dairy Farmer', 'last_name': 'Client (IoT Station)', 'role': 'client'},
            {'username': 'viewer_john', 'email': 'viewer.john@gmail.com', 'first_name': 'John', 'last_name': 'Auditor (Viewer)', 'role': 'viewer'},
        ]

        users = {}
        for r in user_roster:
            user, created = User.objects.get_or_create(
                email=r['email'],
                defaults={
                    'username': r['username'],
                    'first_name': r['first_name'],
                    'last_name': r['last_name'],
                    'role': r['role']
                }
            )
            # Update password and role to ensure aligned seeding
            user.role = r['role']
            user.first_name = r['first_name']
            user.last_name = r['last_name']
            user.set_password('silvora_secure_pass_2026')
            user.save()
            users[r['email']] = user
            
            status_text = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'  - User {r["email"]} [{r["role"]}]: {status_text}'))

        # 2. Create Project 1: Silas Client's Project
        p1 = InternalProject.objects.create(
            id=101, # Keep matching hardcoded ID for perfect frontend alignment
            name="Silvora Labs Enterprise AI Agent Builder",
            description="Engineering an enterprise-grade LLM Agent compilation framework. Features context-tuning live consoles, state vector alignment, and real-time inference tracing dashboards.",
            status='active',
            progress=68,
            client=users['client.silas@gmail.com']
        )
        p1.team.add(users['pm.silas@gmail.com'], users['dev.alex@gmail.com'], users['dev.sarah@gmail.com'])
        p1.save()

        # Seed Tasks for Project 1
        Task.objects.create(
            project=p1,
            title="Secure Client Progress Authentication Gate",
            description="Block internal pipeline pages from unauthorized deep linking, enforcing Gmail logins globally.",
            status='done',
            priority='high',
            assigned_to=users['dev.alex@gmail.com'],
            due_date=datetime.date.today() - datetime.timedelta(days=2)
        )
        Task.objects.create(
            project=p1,
            title="Dynamic Context-Tuning Live Preview Frame",
            description="Mock a functional browser sandbox environment with clickable live context logging actions for clients.",
            status='in_progress',
            priority='medium',
            assigned_to=users['dev.sarah@gmail.com'],
            due_date=datetime.date.today() + datetime.timedelta(days=5)
        )
        Task.objects.create(
            project=p1,
            title="Role-based project list data masking",
            description="Configure queryset filter wrappers on the Django side to mask neighboring client data entirely.",
            status='todo',
            priority='high',
            assigned_to=users['dev.alex@gmail.com'],
            due_date=datetime.date.today() + datetime.timedelta(days=1)
        )

        # 3. Create Project 2: Dairy Client's Project
        p2 = InternalProject.objects.create(
            id=103,
            name="Dairy IoT Smart Station",
            description="Implementing real-time temperature, flow rate, and milk fat sensors on local IoT farm collection points. Feeds analytical analytics charts for predictive collection.",
            status='planning',
            progress=12,
            client=users['client.dairy@gmail.com']
        )
        p2.team.add(users['pm.silas@gmail.com'], users['dev.sarah@gmail.com'])
        p2.save()

        # Seed Tasks for Project 2
        Task.objects.create(
            project=p2,
            title="Calibrate milk fat sensor readings calibration",
            description="Write device scripts to map electrical resistance fluctuations to real collection indexes.",
            status='todo',
            priority='medium',
            assigned_to=users['dev.sarah@gmail.com'],
            due_date=datetime.date.today() + datetime.timedelta(days=12)
        )
        Task.objects.create(
            project=p2,
            title="Draft architectural dashboard schema",
            description="Plan collection models to chart daily collection peaks.",
            status='in_progress',
            priority='low',
            assigned_to=users['pm.silas@gmail.com'],
            due_date=datetime.date.today() + datetime.timedelta(days=8)
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded project tracker sandbox dataset!'))
