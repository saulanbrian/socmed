import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Paper,
  Box,
  Typography
} from '@mui/material'

import { styled } from '@mui/system'

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary':{
    fontSize:'1rem',
    fontWeight:500,
    padding:0
  },
  '& .MuiListItemText-secondary':{
    fontSize:'1rem',
    color:'#000000'
  },
})

const StyledImage = styled('img')({
  height:'250px',
  width:'fit-content',
  maxWidth:'250px',
  objectFit:'contain',
  borderRadius:'5px',
  border:'1px solid #353535cf',
})


const StyledListItem = styled(ListItem)(({theme}) => ({
  display:'flex',
  alignItems:'start',
  paddingTop:0,
}))

export default function Comment({authorProfile,authorId,authorName,text,likes,image}){
  const authorProfileUrl = import.meta.env.VITE_API_URL + authorProfile
  
  return (
    <>
      <StyledListItem>
        <ListItemAvatar>
          <Avatar 
            src={authorProfileUrl}
            sx={{
              marginTop: text && '10px'
            }}/>
        </ListItemAvatar>
        <Box>
          <StyledListItemText 
            primary={authorName}
            secondary={text}
            sx={{
              minHeight:'30px',
            }}/>
          { image && <StyledImage src={image} /> }
        </Box>
      </StyledListItem>
    </>
    )
}