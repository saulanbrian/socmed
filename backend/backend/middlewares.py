from channels.middleware import BaseMiddleware
from urllib.parse import parse_qs

from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from channels.db import database_sync_to_async

from user.models import CustomUser 

class JwtAuthMiddleware(BaseMiddleware):
  async def __call__(self,scope,send,receive):
    query_string = scope['query_string'].decode()
    query_params = parse_qs(query_string)
    token = query_params.get('token',None)
    
    if token:
      try:
        decoded_token = UntypedToken(token[0])
        user_id = decoded_token['user_id']
        user = await database_sync_to_async(CustomUser.objects.get)(id=user_id)
      except (InvalidToken,TokenError,CustomUser.DoesNotExist) as e:
        print(e)
        scope['user'] = None
      else:
        scope['user'] = user
    else:
      scope['user'] = None
    
    await super().__call__(scope,send,receive)
    
    
def JwtAuthMiddlewareStack(inner):
  return JwtAuthMiddleware(inner)

    
