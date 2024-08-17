import {
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetPostsByProfileId = (id,enabled) => {
  return useInfiniteQuery({
    queryKey:['profile',id,'posts'],
    queryFn:async({pageParam = 1}) => {
      const res = await api.get(`posts/profile/${id}?page=${pageParam}`)
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {
      return lastPage.next ? lastPage.current_page + 1: undefined
    },
    enabled:enabled,
  })
}