import { 
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Button
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function CustomListItem({icon,text,clickFn,route}){
  
  function handleClick(){
    clickFn(route)
  }
  
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default function CustomDrawer({open,onClose}){
  
  const navigate = useNavigate()
  
  function handleNavigate(route){
    onClose()
    navigate(route)
  }
  
  return (
      <Drawer open={open} onClose={onClose}>
        <List>
          <CustomListItem 
            text='click me'
            clickFn={handleNavigate}
            route={'/profile'}
            icon={<MenuIcon/>}/>
        </List>
      </Drawer>
    )
}