import api from '../../api.jsx'

import { useUserStore } from '../../user/store/userstore.jsx'
import { useAuthContext } from '../../authentication/context/authContext.jsx'
import { Navigate,useActionData } from 'react-router-dom'
import { useEffect } from 'react'

import ProfileCreationForm from '../components/creationform.jsx'

export default function ProfileCreation(){
  const { isAuthenticated } = useAuthContext()
  const { accountStatus } = useUserStore()
  
  const data = useActionData()

  useEffect(() => {
    data && console.log(data)
  },[data])

  if (isAuthenticated){
    return accountStatus === 'ACTIVE'? <Navigate to='/profile' />: <ProfileCreationForm />
  }else{
    return <Navigate to='/login' />
  }
  
}

export const ProfileCreationAction = async({request}) => {
  
  const formData = await request.formData()
  
  const displayName = formData.get('displayName')
  const description = formData.get('description')
  
  console.log(api)
  
  try{
    const res = await api.post('profile/create',{
      display_name:displayName,
      description:description
      })
    return res.data
  }catch(e){
    return {error:e.response.data}
  }
  
}
