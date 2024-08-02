import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Paper
} from '@mui/material'

import { styled } from '@mui/system'

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary':{
    fontWeight:500,
  },
  '& .MuiListItemText-secondary':{
    fontWeight:450,
  }
})

export default function Comment({authorProfile,authorId,authorName,text,likes}){
  
  const authorProfileUrl = import.meta.env.VITE_API_URL + authorProfile
  
  return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={authorProfileUrl} />
        </ListItemAvatar>
        <Paper sx={{width:'100%',paddingLeft:1}}>
          <StyledListItemText 
            primary={authorName}
            secondary={text}
            color='primary'/>
        </Paper>
      </ListItem>
    )
}