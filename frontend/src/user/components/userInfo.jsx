import {
  Paper,
  Box,
  Avatar
} from '@mui/material'
import {styled} from '@mui/system'

import { useGetUserInfo } from "../queries/user"
import { useEffect } from 'react'
import { useAuthContext } from '../../authentication/context/authContext'
import { useUserStore } from '../store/userstore'


const StyledAvatar = styled(Avatar)(({theme}) => ({
  [theme.breakpoints.down('sm')]:{
    height:200,
    width:200
  },
  [theme.breakpoints.up('md')]:{
    height:200,
    width:200
  }
}))


const StyledPaper = styled(Paper)(({theme}) => ({
  padding:10,
  [theme.breakpoints.down('sm')]:{
    height:'100% !important',
    width:'100vw !important'
  },
  [theme.breakpoints.up('md')]:{
    height:700,
    flexGrow:1,
  }
}))

export default function UserInfo({userId, sx}){

  const {
    isLoading,
    data,
    isSuccess,
    error
  } = useGetUserInfo(userId)
  const { isAuthenticated } = useAuthContext()
  const { id } = useUserStore()

  useEffect(() => {
    data && console.log(data)
  },[data])
  
  return (
    <StyledPaper sx={sx}>
      { 
        isLoading? (
          <p>loading user info</p>
        ): error? (
          <p>an error has occured</p>
        ): data &&(
          <Box>
            <StyledAvatar src={data?.pfp} />
            <p>{data?.display_name}</p>
            <p>{data?.bio}</p>
          </Box>
        )
      }
    </StyledPaper>
  )
}