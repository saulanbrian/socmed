import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const actions = (set) => ({
  setId:(id) => set({id:id}),
  setDisplayName:(name) => set({displayName:name}),
  setProfilePicture:(url) => set({profilePicture:url}),
  reset:() => set({
    id:null,
    displayName: null,
    profilePicture:null,
  })
})

export const useUserStore = create(
  persist(
    (set,get) => ({
      id:null,
      displayName:null,
      profilePicture:null,
      ...actions(set)
    }),
    {
      name:'userStorage'
    }
    )
  )