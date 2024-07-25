import { createContext, useContext, useState,useEffect } from 'react'
import { useUserContext } from '../../user/context/userContext.jsx'
import { jwtDecode } from 'jwt-decode'


const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  
  const userInfo = useUserContext()
  
  const refresh = Boolean(localStorage.getItem('REFRESH_TOKEN'))
  const [isAuthenticated,setIsAuthenticated] = useState(refresh)
  
  function login(access,refresh){
    const decoded = jwtDecode(access)
    localStorage.setItem('ACCESS_TOKEN',access)
    localStorage.setItem('REFRESH_TOKEN',refresh)
    userInfo.setUsername(decoded?.in_app_username || null)
    userInfo.setProfile(decoded?.profile || null)
    if (decoded.setup_complete){
      userInfo.setSetupComplete(true)
    }
    setIsAuthenticated(true)
  }
  
  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,login}}>
      { children }
    </AuthContext.Provider>
  )
}