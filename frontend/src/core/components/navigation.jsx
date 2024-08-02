import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton,
  Box
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './drawer.jsx'
import AvatarButton from './avatarbutton.jsx'

import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import { mobile, desktop } from '../styles/display.jsx'

import './navigation.css'


export default function Nav(){
  
  const [drawerOn,setDrawerOn] = useState(false)
  
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
      <Box sx={{backgroundColor:'#c5c5c5cf'}}>
        <Outlet />
      </Box>
    </>
    )
}

