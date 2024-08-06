import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCreatePost } from '../queries/posts.jsx'

export default function PostCreationPage(){
  
  const { isSuccess, error, isLoading, mutate } = useCreatePost()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(isSuccess){
      navigate('/')
    }
  },[isSuccess])
  
  error && console.log(error)
  
  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    mutate(formData)
  }
  
  
  return (
      <form onSubmit={handleSubmit}>
        <input name='caption' placeholder='caption' />
        <input type='file' name='image' accept='image/*'/>
        <button type='submit' >create</button>
      </form>
    )
}