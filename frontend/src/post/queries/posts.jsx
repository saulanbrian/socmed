import { useQuery } from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetPosts = () => {
  return useQuery({
    queryKey:['posts'],
    queryFn:async() => {
      const res = await api.get('posts')
      return res.data
    }
  })
}