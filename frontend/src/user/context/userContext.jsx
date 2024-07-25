import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUserContext = () => {
  return useContext(UserContext)
}

export function UserContextProvider({children}){
  
  const [username,setUsername] = useState(null)
  const [profile,setProfile] = useState(null)
  const [setupComplete,setSetupComplete] = useState(false)
  
  return (
    <UserContext.Provider value={{
          username,
          setUsername,
          profile,
          setProfile,
          setupComplete,
          setSetupComplete
        }}>
      { children } 
    </UserContext.Provider>
  )
}