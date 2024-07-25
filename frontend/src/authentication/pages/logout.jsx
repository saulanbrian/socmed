import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/authContext.jsx'

export default function Logout(){
  localStorage.clear()
  const { setIsAuthenticated } = useAuthContext()
  
  const navigate = useNavigate()
  
  useEffect(() => {
    setIsAuthenticated(false)
    navigate('/login')
  },[])
  
  return <h1>logging out...</h1>
}