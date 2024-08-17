import { createContext, useContext, useState,useEffect } from 'react'
import { useUserStore } from '../../user/store/userstore.jsx'
import { jwtDecode } from 'jwt-decode'


const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  
  const userStore = useUserStore()
  
  const refresh = Boolean(localStorage.getItem('REFRESH_TOKEN'))
  const [isAuthenticated,setIsAuthenticated] = useState(refresh)
  
  function login(access,refresh){
    const decoded = jwtDecode(access)
    localStorage.setItem('ACCESS_TOKEN',access)
    localStorage.setItem('REFRESH_TOKEN',refresh)
    userStore.setId(decoded.user_id)
    userStore.setProfilePicture(decoded.profile_picture)
    userStore.setDisplayName(decoded.display_name)
    setIsAuthenticated(true)
  }
  
  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,login}}>
      { children }
    </AuthContext.Provider>
  )
}