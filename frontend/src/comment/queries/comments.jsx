import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetComments = (postId) => {
  return useQuery({
    queryKey:['post',postId,'comments'],
    queryFn:async() => {
      const res = await api.get(`posts/${postId}/comments`)
      return res.data
    }
  })
}

export const useAddComment = (postId) => {
  return useMutation({
    mutationKey:['post',postId,'comments'],
    mutationFn:async(text) => {
      const res = await api.post(`posts/${postId}}/comments/`,{
        text:text
      })
      return res.data
    }
  })
}