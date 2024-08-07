import { 
  useQueryClient, 
  useQuery, 
  useMutation,
  useInfiniteQuery }
from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetComments = (postId,enabled) => {
  return useQuery({
    queryKey:['post',postId,'comments'],
    queryFn:async() => {
      const res = await api.get(`posts/${postId}/comments`)
      return res.data
    },
    enabled:enabled
  })
}

export const useAddComment = (postId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['post',postId,'comments'],
    mutationFn:async(data) => {
      const res = await api.post(`posts/${postId}/comments`,data,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      return res.data
    },
    onSuccess:(comment) => {
      queryClient.invalidateQueries(['post',postId,'comments'])
    }
  })
}