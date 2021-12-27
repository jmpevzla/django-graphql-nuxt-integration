from django.contrib import admin
from .models import Movie, Category

# Register your models here.

admin.site.register([Movie, Category])