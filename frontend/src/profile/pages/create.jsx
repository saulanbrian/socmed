import api from '../../api.jsx'

import { useUserStore } from '../../user/store/userstore.jsx'
import { useAuthContext } from '../../authentication/context/authContext.jsx'
import { Navigate,useActionData } from 'react-router-dom'
import { useEffect } from 'react'

import ProfileCreationForm from '../components/creationform.jsx'

export default function ProfileCreation(){
  const { isAuthenticated } = useAuthContext()
  const userStore = useUserStore()
  
  const data = useActionData()

  useEffect(() => {
    if(data){
      data?.error && console.log(data.error)
      
      if (data?.data && data?.status === 201) {
        userStore.setDisplayName(data.data?.display_name || null)
        userStore.setProfilePicture(data.data?.picture || null)
        userStore.setDescription(data.data?.description || null)
        userStore.setAccountStatus('ACTIVE')
      }
    }
  },[data])

  if (isAuthenticated){
    return userStore.accountStatus === 'ACTIVE'? <Navigate to='/profile' />: <ProfileCreationForm />
  }else{
    return <Navigate to='/login' />
  }
  
}

export const ProfileCreationAction = async({request}) => {
  
  const formData = await request.formData()
  
  const displayName = formData.get('displayName')
  const description = formData.get('description')
  
  try{
    const res = await api.post('profile/create',{
      display_name:displayName,
      description:description
      })
    const { data, status } = res
    return { data, status }
  }catch(e){
    return {error:e.response.data}
  }
  
}
