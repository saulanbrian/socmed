import api from '../../api.jsx'

import { useUserStore } from '../../user/store/userstore.jsx'

import { Navigate } from 'react-router-dom'

export default function ProfileCreation(){
  const { setupComplete } = useUserStore()

  return setupComplete? <Navigate to='/profile' />:
    (
      <h1>this is a creation form</h1>
    )
  
}