import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLikePost, useUnlikePost } from '../queries/likedposts.jsx'

export default function Post({caption, id, isLiked}){
  
  const [liked,setLiked] = useState(isLiked)
  
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
  
  function handleClick(e){
    e.preventDefault();
    if(liked) { 
      unlike(id)
      setLiked(false)
    }
    else{
      like(id)
      setLiked(true)
    }
  }
  
  return (
    <>
    <h1>{caption}</h1>
    <button onClick={handleClick}
            disabled={unliking || liking}>
      {liked?'unlike':'like'}
    </button>
    </>
    )
}