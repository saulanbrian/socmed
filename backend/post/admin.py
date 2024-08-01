from django.contrib import admin

from .models import Post

class PostAdmin(admin.ModelAdmin):
  fields = ('author','caption')

admin.site.register(Post,PostAdmin)
