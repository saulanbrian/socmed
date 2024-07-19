import { useActionData, useNavigate, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext.jsx'
import { useEffect } from 'react'

import AuthForm from '../components/authForm.jsx'

import api from '../../api.jsx'

export default function Signup(){
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const data = useActionData()
  
  useEffect(() => {
    if(data){
      data?.error? console.log(data.error): navigate('/login')
    }
  },[data])
  
  return isAuthenticated? <Navigate to='/' />: <AuthForm userAction="signup" />
}

export async function SignupAction({request}){
  
  const formData = await request.formData()
  
  const username = formData.get('username')
  const password = formData.get('password')
  const confirmation = formData.get('confirmation')
  
  if(password != confirmation){
    return {error:'password do not match'}
  }
  
  try{
    const res = await api.post('user/signup/',{
      username:username,
      password:password
      })
      return res.data
  }catch(e){
    return {error:'an error has occured'}
  }
  
}