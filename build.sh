#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate --no-input

# Create admin only when password env is set (safe for Render)
python create_admin.py || true
