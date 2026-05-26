from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, RegisterSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class GoogleLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Normalize email
        email = email.lower().strip()

        # Find or create user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Look up mock account info for auto-provisioning
            mock_accounts = {
                'admin.silvora@gmail.com': {'username': 'admin_silvora', 'first_name': 'System', 'last_name': 'Admin', 'role': 'admin'},
                'pm.silas@gmail.com': {'username': 'pm_silas', 'first_name': 'Silas', 'last_name': 'Kipkemoi (PM)', 'role': 'project_manager'},
                'dev.alex@gmail.com': {'username': 'dev_alex', 'first_name': 'Alex', 'last_name': 'Developer', 'role': 'developer'},
                'dev.sarah@gmail.com': {'username': 'dev_sarah', 'first_name': 'Sarah', 'last_name': 'Developer', 'role': 'developer'},
                'client.silas@gmail.com': {'username': 'client_silas', 'first_name': 'Silas', 'last_name': 'Client (AI Builder)', 'role': 'client'},
                'client.dairy@gmail.com': {'username': 'client_dairy', 'first_name': 'Dairy Farmer', 'last_name': 'Client (IoT Station)', 'role': 'client'},
                'viewer.john@gmail.com': {'username': 'viewer_john', 'first_name': 'John', 'last_name': 'Auditor (Viewer)', 'role': 'viewer'}
            }
            
            mock_info = mock_accounts.get(email, {
                'username': email.split('@')[0].replace('.', '_'),
                'first_name': email.split('@')[0].split('.')[0].capitalize(),
                'last_name': 'Admin Member',
                'role': 'client' if 'client' in email else 'admin'
            })

            # Create the user
            user = User.objects.create_user(
                username=mock_info['username'],
                email=email,
                first_name=mock_info['first_name'],
                last_name=mock_info['last_name'],
                role=mock_info['role']
            )
            # Set default password
            user.set_password('silvora_secure_pass_2026')
            user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
