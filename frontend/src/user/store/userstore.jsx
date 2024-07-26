import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const actions = (set) => ({
  setDisplayName:(name) => set({displayName:name}),
  setProfilePicture:(url) => set({profilePicture:url}),
  setAccountStatus:(status) => set({accountStatus:status}),
  reset:() => set({
    displayName: null,
    profilePicture:null,
    accountStatus:null
  })
})

export const useUserStore = create(
  persist(
    (set,get) => ({
      displayName:null,
      profilePicture:null,
      accountStatus:null,
      ...actions(set)
    }),
    {
      name:'userStorage'
    }
    )
  )