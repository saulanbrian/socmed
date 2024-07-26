import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const actions = (set) => ({
  setDisplayName:(name) => set(
    {
      displayName:name,
      setupComplete: name? true: false
    }
    ),
  setProfilePicture:(url) => set({profilePicture:url}),
  reset:() => set({
    displayName: null,
    profilePicture:null,
    setupComplete:false
  })
})

export const useUserStore = create(
  persist(
    (set,get) => ({
      displayName:null,
      profilePicture:null,
      setupComplete:false,
      ...actions(set)
    }),
    {
      name:'userStorage'
    }
    )
  )