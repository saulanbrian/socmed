import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/authContext.jsx'
import { useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '../../user/store/userstore.jsx'

export default function Logout(){

  const client = useQueryClient()
  const { setIsAuthenticated } = useAuthContext()
  const reset = useUserStore.getState().reset
  
  const navigate = useNavigate()
  
  localStorage.clear()
  localStorage.removeItem('userStorage')
  client.invalidateQueries()
  
  useEffect(() => {
    setIsAuthenticated(false)
    navigate('/login')
  },[])
  
  return <h1>logging out...</h1>
}