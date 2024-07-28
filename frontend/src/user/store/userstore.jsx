import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const actions = (set) => ({
  setDisplayName:(name) => set({displayName:name}),
  setProfilePicture:(url) => set({profilePicture:url}),
  setAccountStatus:(status) => set({accountStatus:status}),
  setDescription:(description) => set({description:description}),
  reset:() => set({
    displayName: null,
    description:null,
    profilePicture:null,
    accountStatus:null
  })
})

export const useUserStore = create(
  persist(
    (set,get) => ({
      displayName:null,
      profilePicture:null,
      description:null,
      accountStatus:null,
      ...actions(set)
    }),
    {
      name:'userStorage'
    }
    )
  )