import { 
  useQueryClient, 
  useQuery, 
  useMutation,
  useInfiniteQuery }
from '@tanstack/react-query'

import api from '../../api.jsx'


export const useGetComments = (postId,pageSize) => {
  return useInfiniteQuery({
    queryKey:['post',postId,'comments'],
    queryFn:async({pageParam = 1}) => {
      const res = await api.get(`posts/${postId}/comments?page=${pageParam}&page_limit=${pageSize? pageSize: 10}`)
      return res.data
    },
    getNextPageParam:(lastPage,page) => {
      return lastPage.next? lastPage.current_page + 1: undefined
    },
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
      queryClient.setQueryData(['post',postId,'comments'], (data) => {
        let firstPage = data.pages.shift()
        firstPage.results = [comment,...firstPage.results]
        const pages = [firstPage,...data.pages]
        return {
          ...data,
          pages:[...pages]
        }
      })
    }
  })
}