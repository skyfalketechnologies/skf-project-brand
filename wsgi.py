"""
WSGI entry for Render when Start Command is:
  gunicorn backend.wsgi:application

Preferred Start Command (Root Directory = backend):
  gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
"""
import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

from core.wsgi import application  # noqa: E402

__all__ = ["application"]
