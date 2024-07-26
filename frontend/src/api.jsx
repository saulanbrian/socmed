import axios from 'axios';

import {jwtDecode} from 'jwt-decode'

const backendUrl = import.meta.env.VITE_API_URL

async function refreshToken(){
  const refresh = localStorage.getItem('REFRESH_TOKEN','')
  try {
    const res = await axios.post(`${backendUrl}/auth/token/refresh/`,{
      refresh:refresh
      })
    return res.data.access
  }catch(e){
    console.log(e.response)
    return null
  }
}

const api = axios.create({
  baseURL:backendUrl
})

api.interceptors.request.use(
  async(config) => {
    
    let access = localStorage.getItem('ACCESS_TOKEN','')
    
    if (access) {
      const decoded = jwtDecode(access)
      if (decoded.exp < Date.now() / 1000) {
        access = await refreshToken()
      }
      config.headers.Authorization = `Bearer ${access}`
    }
    
    console.log(config)
    
    return config
  }
  )
  
  
export default api;