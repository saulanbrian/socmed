import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext.jsx'

export default function Logout(){
  localStorage.clear()
  const { setIsAuthenticated } = useAuthContext()
  setIsAuthenticated(false)
  return <Navigate to='/login' />
}