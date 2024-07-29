import {
  useQuery,
  useMutation,
  useQueryClient } from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetPosts = () => {
  return useQuery({
    queryKey:['posts'],
    queryFn:async() => {
      const res = await api.get('posts')
      return res.data
    },
    staleTime:10 * 60 * 1000,
    cacheTime:10 * 60 * 1000
  })
}

export const useCreatePost = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['posts'],
    mutationFn:async({caption}) => {
      const res = await api.post('posts/',{
        caption:caption
      })
      return res.data
    },
    onSuccess:(post) => {
      queryClient.setQueryData(['posts'],(prev) => [
        ...prev,post
        ])
    }
  })
}