import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItem
} from '@mui/material'

import { styled } from '@mui/system'

import { useNavigate } from 'react-router-dom'

const StyledBox = styled(Box)(({theme}) => ({
  padding:5
}))

const StyledPaper = styled(Paper)(({theme}) => ({
  
}))

export default function LeftSideBar(){
  
  const navigate = useNavigate()
  
  const routes = [
      { repr:'Feed', route:'/' },
      { repr:'Liked Posts', route:'/' },
      { repr:'Following', route:'/' },
    ]
  
  function handleClick(route){
    navigate(route)
  }
  
  return (
      <StyledBox>
        <StyledPaper>
          <List>
            {
              routes.map(({repr,route}) => (
                <ListItem key={repr}>
                  <ListItemButton 
                    onClick={() => handleClick(route)}>
                    { repr } 
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </StyledPaper>
      </StyledBox>
    )
}