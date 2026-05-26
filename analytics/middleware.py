from .models import PageView

class AnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Only track GET requests that are not to the admin or static/media files
        if request.method == 'GET' and not request.path.startswith(('/admin/', '/static/', '/media/')):
            # Get IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            
            # Create PageView record
            PageView.objects.create(
                path=request.path,
                ip_address=ip,
                user_agent=request.META.get('HTTP_USER_AGENT', '')[:500]
            )

        return response
