import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLikePost, useUnlikePost } from '../queries/likedposts.jsx'

export default function Post({caption, id, isLiked, likeCounts, image}){
  
  const [liked,setLiked] = useState(isLiked)
  const [likes,setLikes] = useState(likeCounts)
  
  const {
    error:likeFailed,
    isSuccess:likeSuccess,
    isPending:liking,
    mutate:like
  } = useLikePost()
  
  const {
    error:unlikeFailed,
    isSuccess:unlikeSuccess,
    isPending:unliking,
    mutate:unlike
  } = useUnlikePost()
  
  async function handleClick(e){
    e.preventDefault();
    liked? await unlike(id): await like(id)
    liked? setLikes(prev => prev - 1): setLikes(prev => prev + 1)
    setLiked(!liked)
  }
  
  return (
    <>
    <h1>{caption}</h1>
    <p>likes: {likes} </p>
    <button onClick={handleClick}
            disabled={unliking || liking}>
      {liked?'unlike':'like'}
    </button>
    </>
    )
}