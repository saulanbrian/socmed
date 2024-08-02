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