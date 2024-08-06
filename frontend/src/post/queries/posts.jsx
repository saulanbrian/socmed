import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'

import api from '../../api.jsx'



export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey:['posts'],
    queryFn:async({pageParam = 1}) => {
      const res = await api.get(`posts/?page=${pageParam}`)
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {
      return lastPage?.next? lastPage.current_page + 1: undefined
    }
  })
}


export const useCreatePost = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['posts'],
    mutationFn:async(formData) => {
      const res = await api.post('posts/',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
        })
      return res.data
    },
    onSuccess:(post) => {
      queryClient.invalidateQueries(['posts'])
    }
  })
}
