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
  display:'flex',
  '& > *':{
    flex:2
  }
}))

const MainBox = styled(Box)(({theme}) => ({
  flex:3,
  '& > *':{
    width:'100%'
  }
}))

export default function Core(){
  
  const onWideScreen = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { isAuthenticated } = useAuthContext()
  
  function closeDrawer(){
    setDrawerOn(false)
  }
  
  return (
    <>
      <AppBar id='app-bar'>
        <Toolbar>
          { isAuthenticated && <AvatarButton /> }
        </Toolbar>
      </AppBar>
      <StyledBox sx={{backgroundColor:'#c5c5c5cf'}}>
      { onWideScreen && <LeftSideBar />}
        <MainBox>
          <Outlet />
        </MainBox>
      { onWideScreen && <RightSideBar />}
      {!onWideScreen && <CustomSpeedDial />}
      </StyledBox>
    </>
    )
}
