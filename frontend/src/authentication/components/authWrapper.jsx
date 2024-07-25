import { useAuthContext } from '../context/authContext.jsx'
import { useUserContext } from '../../user/context/userContext.jsx'
import { useNavigate,Navigate } from 'react-router-dom'

export default function AuthWrapper({children}){
  const { isAuthenticated } = useAuthContext()
  const { setupComplete } = useUserContext()
  
  if (isAuthenticated){
    return setupComplete? children: <Navigate to='profile/' />
  }else{
    return <Navigate to='/login' />
  }
  
}