import { 
  useQuery, 
  useMutation, 
  useQueryClient } from '@tanstack/react-query'
  
import api from '../../api.jsx'

  
export const useGetLikedPosts = () => {
  return useQuery({
    queryKey:['posts','liked'],
    queryFn:async() => {
      const res = await api.get('posts/liked_posts')
      return res.data
    },
    staleTime:10 * 60 * 1000,
    cacheTime:10 * 60 * 1000
  })
}


export const useLikePost = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['posts','liked'],
    mutationFn:async(id) => {
      const res = await api.post(`posts/like_unlike_post/${id}`)
      return res.data
    },
    onSuccess:(likedPost) => {
      queryClient.setQueryData(['posts','liked'],(posts) => [
          ...posts,likedPost
        ])
    }
  })
}


export const useUnlikePost = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['posts','liked'],
    mutationFn:async(id) => {
      const res = await api.post(`posts/like_unlike_post/${id}`)
      return res.data
    },
    onSuccess:(unlikedPost) => {
      queryClient.setQueryData(['posts','liked'],(posts) => {
        return posts? posts.filter(post => post.id !== unlikedPost.id): [];
      })
    }
  })
}