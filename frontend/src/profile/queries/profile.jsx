import { 
  useQuery,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'

import api from '../../api.jsx'

export const useGetProfile = (id) => {
  const url = id? `profile/${id}`: 'profile/'
  return useQuery({
    queryKey:id? ['profile',id]: ['profile'],
    queryFn:async() => {
      const res = await api.get(url)
      return res.data
    }
  })
}