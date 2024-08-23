import { 
  Box,
  useMediaQuery
} from '@mui/material'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useGetUserInfo } from '../queries/user.jsx'
import { useUserStore } from '../store/userstore.jsx'
import { useEffect } from 'react'

import UserPostsInfiniteScroll from '../../post/components/userPostsInfiniteScroll.jsx'
import UserInfo from '../components/userInfo.jsx'


const StyledBox = styled(Box)(({theme}) => ({
  display:'flex',
  backgroundColor:theme.palette.primary.dark,
  flexWrap:'nowrap',
  padding:8,
  justifyContent:'center',
  gap:8,
  [theme.breakpoints.down('sm')]:{
    flexWrap:'wrap'
  }
}))

const PostBox = styled(Box)(({theme}) => ({
  maxHeight:'100vh',
  overflow:'auto',
  background:'grey',
  flexGrow:1,
  maxWidth:'40vw'
}))


export default function Profile(){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const {id} = useParams()
  const {id:userId} = useUserStore()
  
  return (
    <StyledBox id='main-box'>
      <UserInfo userId={id? id: userId} sx={{maxWidth:'40vw'}} />
      <PostBox id='actual-parent'>
        <UserPostsInfiniteScroll 
          userId={id? id: userId} 
          scrollableTarget={onSmallScreen? 'main-box':'actual-parent'}/>
      </PostBox>
    </StyledBox>
  )
}