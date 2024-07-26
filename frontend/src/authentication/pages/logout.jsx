import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/authContext.jsx'
import { useQueryClient } from '@tanstack/react-query'

export default function Logout(){
  localStorage.clear()
  
  const client = useQueryClient()
  const { setIsAuthenticated } = useAuthContext()
  
  const navigate = useNavigate()
  
  client.invalidateQueries()
  
  useEffect(() => {
    setIsAuthenticated(false)
    navigate('/login')
  },[])
  
  return <h1>logging out...</h1>
}