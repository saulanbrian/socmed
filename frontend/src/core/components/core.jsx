import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton,
  Box,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AvatarButton from './avatarbutton.jsx'

import LeftSideBar from './leftSideBar.jsx'
import RightSideBar from './rightSideBar.jsx'
import CustomSpeedDial from './speedDial.jsx'

import { styled } from '@mui/system'

import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import { mobile, desktop } from '../styles/display.jsx'

import './core.css'
import { useAuthContext } from '../../authentication/context/authContext.jsx';


const StyledBox = styled(Box)(({theme}) => ({
  backgroundColor:theme.palette.primary.dark,
  display:'flex',
  gap:4,
  padding:4,
  '& > *':{
    flex:2
  }
}))

const MainBox = styled(Box)(({theme}) => ({
  flex:3,
  paddingTop:4,
  '& > *':{
    width:'100%',
    maxHeight:'100%'
  }
}))

export default function Core(){
  
  const onMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const onTablet = useMediaQuery((theme) => { return theme.breakpoints.down('md') && theme.breakpoints.up('sm')} )
  const onDesktop = useMediaQuery((theme) => { return theme.breakpoints.up('lg') })
  const { isAuthenticated } = useAuthContext()

  function closeDrawer(){
    setDrawerOn(false)
  }
  
  return (
    <>
      <AppBar id='app-bar' color='primary'>
        <Toolbar>
          { isAuthenticated && <AvatarButton /> }
        </Toolbar>
      </AppBar>
      <StyledBox>
      { onDesktop && <LeftSideBar />}
        <MainBox>
          <Outlet />
        </MainBox>
      { onTablet && <RightSideBar />}
      { onMobile && <CustomSpeedDial />}
      </StyledBox>
    </>
    )
}
