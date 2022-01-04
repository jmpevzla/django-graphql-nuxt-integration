from dotenv import load_dotenv
load_dotenv()

from .settings import *
from os import path

DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')
INSTALLED_APPS.append('debug_toolbar')
INTERNAL_IPS = ('127.0.0.1', 'localhost')

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': path.join(BASE_DIR, 'vue/webpack-stats.json'),
    }
}

STATICFILES_DIRS = [
    path.join(BASE_DIR, "static"),
]
MEDIA_URL = '/dmedia/'
MEDIA_ROOT = path.join(BASE_DIR, "mediafiles")

STATIC_URL = '/static/'
STATIC_ROOT = path.join(BASE_DIR, "staticfiles")

VUE_ROOT = path.join(BASE_DIR, "vue", "static")