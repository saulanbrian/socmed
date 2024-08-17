import { useParams } from 'react-router-dom'
import { useGetUserInfo } from '../queries/user.jsx'
import { useUserStore } from '../store/userstore.jsx'
import { useEffect } from 'react'

import ProfileComponent from '../components/profile.jsx'

export default function Profile(){
  
  const {id} = useParams()
  const {id:userId} = useUserStore()
  
  const {
    isLoading,
    error,
    data:userInfo,
    status
  } = useGetUserInfo(id? id: userId)
  
  useEffect(() => {
    userInfo && console.log(userInfo)
    error && console.log(error)
    status && console.log(status)
  },[error,userInfo,status])
  
  return isLoading? (
      <p>loading...</p>
    ): error? (
      <p>an error has occured</p>
    ): <ProfileComponent userInfo={userInfo} />
}