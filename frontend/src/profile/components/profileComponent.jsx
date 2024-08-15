import { useGetProfile } from '../queries/profile.jsx'

import { useEffect } from 'react'

export default function ProfileComponent({profileId}){
  
  const {
    isLoading,
    error,
    data
  } = useGetProfile(profileId && profileId)
  
  useEffect(() => {
    data && console.log(data)
  },[data])
  
  return (
    <h1>{profileId}</h1>
  )
}