import { createContext, useContext, useState,useEffect } from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  
  const refresh = Boolean(localStorage.getItem('REFRESH_TOKEN'))
  const [isAuthenticated,setIsAuthenticated] = useState(refresh)
  
  function login(access,refresh){
    localStorage.setItem('ACCESS_TOKEN',access)
    localStorage.setItem('REFRESH_TOKEN',refresh)
    setIsAuthenticated(true)
  }
  
  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,login}}>
      { children }
    </AuthContext.Provider>
  )
}