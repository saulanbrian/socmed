import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItem,
  Button
} from '@mui/material'
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

import { styled } from '@mui/system'

import { useNavigate } from 'react-router-dom'


const StyledButton = styled(Button)(({theme}) => ({
  width:'100%',
  margin:4,
  padding:4,
  display:'flex',
  height:52,
  justifyContent:'flex-start',
  fontSize:16,
  textTransform:'none',
  border:16,
  paddingLeft:24
}))

const StyledBox = styled(Box)(({theme}) => ({
  padding:4,
}))


const StyledPaper = styled(Paper)(({theme}) => ({
  padding:4,
  borderTop:`20px solid ${theme.palette.primary.main}`
}))

export default function LeftSideBar(){
  
  const navigate = useNavigate()
  
  const routes = [
      { repr:'Feed', route:'/',icon:<HomeSharpIcon /> },
      { repr:'Liked Posts', route:'/',icon:<FavoriteSharpIcon /> },
      { repr:'Following', route:'/',icon:<PeopleSharpIcon />},
    ]
  
  function handleClick(route){
    navigate(route)
  }
  
  return (
      <StyledBox>
        <StyledPaper>
          <List>
            {
              routes.map(({repr,route,icon = null}) => (
                <ListItem key={repr} disablePadding disableGutters>
                  <StyledButton 
                    onClick={() => handleClick(route)} disableRipple startIcon={icon}>
                    { repr } 
                  </StyledButton>
                </ListItem>
              ))
            }
          </List>
        </StyledPaper>
      </StyledBox>
    )
}