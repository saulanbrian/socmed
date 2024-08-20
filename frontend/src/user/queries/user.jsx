import { 
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery
} from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetUserInfo = (id) => {
  return useQuery({
    queryKey: ['user',id,'info'],
    queryFn:async() => {
      const res = await api.get(`user/${id}`)
      return res.data
    }
  })
}

export const useGetUserPosts = (id) => {
  return useInfiniteQuery({
    queryKey:['user',id,'posts'],
    queryFn:async({pageParam}) => {
      const res = await api.get(`user/${id}/posts?page=${pageParam}`)
      return res.data
    },
    initialPageParam:1,
    getNextPageParam:(lastPage,pages) => {
      return lastPage.next? lastPage.current_page + 1: undefined
    }
  })
}