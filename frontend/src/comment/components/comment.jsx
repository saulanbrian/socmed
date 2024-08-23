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
    fontSize:'0.8rem',
    fontWeight:520,
   
  },
  '& .MuiListItemText-secondary':{
    fontSize:'0.7rem',
    color:'#000000',
    fontWeight:360
  },
})

const StyledImage = styled('img')({
  height:'250px',
  width:'fit-content',
  maxWidth:'250px',
  objectFit:'contain',
  borderRadius:'4px',
  border:'1px solid #353535cf',
})


const StyledListItem = styled(ListItem)(({theme}) => ({
  display:'flex',
  alignItems:'start',
  
  borderLeft:`1px solid ${theme.palette.primary.dark}`
}))

export default function Comment({authorProfile,authorId,authorName,text,likes,image,sx}){
  const authorProfileUrl = import.meta.env.VITE_API_URL + authorProfile
  
  return (
    <StyledListItem sx={sx}>
      <ListItemAvatar>
        <Avatar 
          src={authorProfileUrl}
          sx={{
            marginTop: text && '8px'
          }}
          sizes='small'/>
      </ListItemAvatar>
      <Box>
        <StyledListItemText 
          primary={authorName}
          secondary={text}
          sx={{
            minHeight:'28px',
          }}
          />
        { image && <StyledImage src={image} /> }
      </Box>
    </StyledListItem>
  )
}