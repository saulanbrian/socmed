import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Drawer,
  TextField
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import { styled } from '@mui/system'

import { useNavigate } from 'react-router-dom'
import React,{ useState } from 'react'

const StyledSpeedDial = styled(SpeedDial)(({theme}) => ({
  position:'fixed',
  bottom:30,
  right:30
}))


const SearchDrawer = ({open,onClose}) => {
  return (
      <Drawer 
        anchor='top' 
        open={open}
        onClose={onClose}>
        <TextField placeholder='search...'/>
      </Drawer>
    )
}


export default function CustomSpeedDial(){
  
  const [open, setOpen] = useState(false)
  const [drawerOpen,setDrawerOpen]= useState(false)
  const navigate = useNavigate()
  
  const actions = [
    { 
      tooltip:'post',
      icon:<AddSharpIcon color='primary'/>,
      fn:() => { navigate('/post/create') }
    },
    {
      tooltip:'search',
      icon:<SearchSharpIcon />,
      fn:() => { setDrawerOpen(true) }
    }
  ]
  
  function closeDrawer(){
    setDrawerOpen(false)
  }
  
  return (
    <React.Fragment>
      <SearchDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <StyledSpeedDial
        ariaLabel='dial'
        open={ !!open }
        icon={(
          <SpeedDialIcon 
            icon={<MenuOpenSharpIcon/>}
            openIcon={<CloseIcon />}/>
        )}
        FabProps={{size:'large'}}
        onClick={() => setOpen(!open)}>
        { 
          actions.map((action,index) => (
            <SpeedDialAction 
              key={index}
              icon={action.icon}
              delay={index}
              tooltipTitle={action.tooltip}
              tooltipOpen
              onClick={() => action.fn()}/>
          )) 
        }
      </StyledSpeedDial>
    </React.Fragment>
  )
}