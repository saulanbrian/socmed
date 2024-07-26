import api from '../../api.jsx'

import { useUserStore } from '../../user/store/userstore.jsx'
import { useAuthContext } from '../../authentication/context/authContext.jsx'

import { Navigate } from 'react-router-dom'

export default function ProfileCreation(){
  const { isAuthenticated } = useAuthContext()
  const { accountStatus } = useUserStore()

  if (isAuthenticated){
    return accountStatus === 'ACTIVE'? <Navigate to='/profile' />: <h1>this is a profile creation form</h1>
  }else{
    return <Navigate to='/login' />
  }
  
}