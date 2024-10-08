from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CommentPagination(PageNumberPagination):
  page_size = 10
  page_size_query_param = 'page_limit'
  
  def get_paginated_response(self,data):
    return Response({
      'count':self.page.paginator.count,
      'next':self.get_next_link(),
      'previous':self.get_previous_link(),
      'current_page':self.page.number,
      'results':data,
      'total_pages':self.page.paginator.num_pages
    })