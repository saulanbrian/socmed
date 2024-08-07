from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
  page_size = 10
  
  def get_paginated_response(self,data):
    return Response({
      'count': self.page.paginator.count,
      'next': self.get_next_link(),
      'previous': self.get_previous_link(),
      'current_page': self.page.number,
      'results': data,
      'total_pages':self.page.paginator.num_pages
    })