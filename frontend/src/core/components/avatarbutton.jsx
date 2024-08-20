import { 
  Avatar, 
  Button, 
  Menu, 
  MenuItem,
  MenuList,
  IconButton,
} from '@mui/material'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../user/store/userstore.jsx'

export default function AvatarButton(){
  
  const profile = useUserStore((state) => state.profilePicture)
  const profileUrl = import.meta.env.VITE_API_URL  + profile
  const navigate = useNavigate()
  const [anchorEl,setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  
  function openMenu(e){
    setAnchorEl(e.target)
  }
  
  function handleClose(e,url){
    console.log(url)
    setAnchorEl(null)
    navigate(url)
  }
  
  return (
    <>
    <Button onClick={openMenu} sx={{marginLeft:'auto',cursor:'pointer'}}>
      <Avatar src={profileUrl} />
    </Button>
    <Menu open={menuOpen} 
          anchorEl={anchorEl}
          onClose={e => setAnchorEl(null)}>
      <MenuList>
        <MenuItem onClick={e => handleClose(e,'/me')}>
          profile
        </MenuItem>
        <MenuItem onClick={handleClose} divider>account</MenuItem>
        <MenuItem onClick={handleClose}>logout</MenuItem>
      </MenuList>
    </Menu>
    </>
  )
}