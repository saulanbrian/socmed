
import { useUserStore } from '../../user/store/userstore.jsx'
import { useParams } from 'react-router-dom'

import ProfileComponent from '../components/profileComponent.jsx'

export default function ProfilePreview(){
  
  const { id } = useParams()
  const { profileId:userId } = useUserStore()
  

  return (
    <ProfileComponent 
      profileId={ id? id: userId} />
  )
}