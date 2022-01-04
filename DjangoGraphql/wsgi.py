"""
WSGI config for DjangoGraphql project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
from django.contrib.staticfiles.handlers import StaticFilesHandler

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DjangoGraphql.settings')

if settings.DEBUG:
    application = get_wsgi_application()
else:
    application = StaticFilesHandler(get_wsgi_application())
