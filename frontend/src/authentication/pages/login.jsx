import { useActionData,useNavigate,Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/authContext.jsx'

import AuthForm from '../components/authForm.jsx'

import api from '../../api.jsx'

export default function Login(){
  const { isAuthenticated, login } = useAuthContext()
  const navigate = useNavigate()
  const data = useActionData()
  
  useEffect(() => {
    if(data) {
      data?.error? console.log(data.error): 
        login(data.access,data.refresh)
    }
  },[data])
  
  return isAuthenticated? <Navigate to='/' />: <AuthForm userAction={"login"} />
}

export async function LoginAction({request}){
  
  const formData = await request.formData();
  
  const username = formData.get('username')
  const password = formData.get('password')
  
  try{ 
    const res = await api.post('auth/token/',{
      username:username,
      password:password
    })
    return res.data
  }catch(e){
    return {'error':e.response.data.detail}
  }
  }
