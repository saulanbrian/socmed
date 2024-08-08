import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton,
  Box,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './drawer.jsx'
import AvatarButton from './avatarbutton.jsx'

import { styled } from '@mui/system'

import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import { mobile, desktop } from '../styles/display.jsx'

import './core.css'


const StyledBox = styled(Box)(({theme}) => ({
  display:'flex',
  '& > *':{
    flex:2
  }
}))

export default function Core(){
  
  const [drawerOn,setDrawerOn] = useState(false)
  const onWideScreen = useMediaQuery((theme) => theme.breakpoints.up('md'))
  
  function closeDrawer(){
    setDrawerOn(false)
  }
  
  function openDrawer(){
    setDrawerOn(true)
  }
  
  return (
    <>
      <AppBar id='app-bar'>
        <Toolbar>
          <IconButton color='inherit' 
                      onClick={openDrawer}
                      edge='start'
                      sx={{...mobile,marginRight:'auto'}}>
            <MenuIcon />
          </IconButton>
          <Button color='inherit' sx={{...desktop,marginLeft:'auto'}}>
            profile
          </Button>
          <AvatarButton/>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOn} onClose={closeDrawer}/>
      <StyledBox sx={{backgroundColor:'#c5c5c5cf'}}>
        { onWideScreen && <aside>haha</aside>}
        <Outlet />
        { onWideScreen && <aside>haha</aside>}
      </StyledBox>
    </>
    )
}
