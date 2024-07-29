import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCreatePost } from '../queries/posts.jsx'

export default function PostCreationPage(){
  
  const { isSuccess, error, isLoading, mutate } = useCreatePost()
  const navigate = useNavigate()
  
  useEffect(() => {
    isSuccess && navigate('/')
  },[isSuccess])
  
  function handleSubmit(e){
    e.preventDefault()
    const data = e.target
    const caption = data.caption.value
    mutate({caption:caption})
  }
  
  
  return (
      <form onSubmit={handleSubmit}>
        <input name='caption' placeholder='caption' />
        <button type='submit' >create</button>
      </form>
    )
}