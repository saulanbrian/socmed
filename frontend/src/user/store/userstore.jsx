import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const actions = (set) => ({
  setDisplayName:(name) => set({displayName:name}),
  setProfilePicture:(url) => set({profilePicture:url}),
  setAccountStatus:(status) => set({accountStatus:status}),
  setProfileId:(id) => set({profileId:id}),
  reset:() => set({
    displayName: null,
    profileId:null,
    profilePicture:null,
    accountStatus:null
  })
})

export const useUserStore = create(
  persist(
    (set,get) => ({
      displayName:null,
      profileId:null,
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