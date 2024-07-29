import { useGetLikedPosts } from '../queries/likedposts.jsx'
import Post from './post.jsx'

export default function LikedPostContainer(){
  const { 
    data,
    isLoading,
    error,
    isSuccess
  } = useGetLikedPosts()
  
  if (isLoading) return <p>loading...</p>
  
  return (
    <div>
      {
        data && data.length >= 1 && data.map(post => (
            <Post key={post.id}
                  caption={post.caption}
                  isLiked={post.is_liked}
                  id={post.id} />
          ))
      }
    </div>
    )
}