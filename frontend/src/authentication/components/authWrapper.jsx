import { useAuthContext } from '../context/authContext.jsx'
import { useUserStore } from '../../user/store/userstore.jsx'
import { useNavigate,Navigate } from 'react-router-dom'

export default function AuthWrapper({children}){
  const { isAuthenticated } = useAuthContext()
  const { accountStatus } = useUserStore()
  
  if (isAuthenticated){
    return accountStatus === 'ACTIVE'? children: <Navigate to='/profile/create' />
  }else{
    return <Navigate to='/login' />
  }
  
}