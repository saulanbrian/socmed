import { useNavigate } from 'react-router-dom'

export default function PostCreationButton (){
  
  const navigate = useNavigate()
  
  return (
    <button onClick={() => navigate('/post/create')}>
      create a post
    </button>
    )
}