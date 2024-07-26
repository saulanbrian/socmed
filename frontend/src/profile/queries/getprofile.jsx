import { useQuery, useQueryClient} from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetProfile = async(id) => {
  
  const key = id? ['profile',id]: ['profile']
  const url = id? `profile/${id}`: 'profile'
  
  return useQuery({
    queryKey:key,
    queryFn:async() => {
      const res = await api.get(url)
      return res.data
    }
  })
}