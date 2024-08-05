import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Paper
} from '@mui/material'

import { styled } from '@mui/system'

const StyledListItemText = styled(ListItemText)({
  borderRadius:7,
  '& .MuiListItemText-primary':{
    fontWeight:500,
  },
  '& .MuiListItemText-secondary':{
    fontWeight:450,
  },
  '& .MuiListItemText-root':{
    borderRadius:90
  }
})

const StyledImage = styled('img')({
  height:'250px',
  width:'250px',
  objectFit:'contain',
  borderRadius:'10px',
  border:'1px solid #353535cf',
  marginLeft:'70px'
})


export default function Comment({authorProfile,authorId,authorName,text,likes,image}){
  const authorProfileUrl = import.meta.env.VITE_API_URL + authorProfile
  const imageOnly = Boolean(image && !text)
  
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={authorProfileUrl} />
        </ListItemAvatar>
        { 
          text && (
            <Paper sx={{width:'100%',paddingLeft:1}}> 
              <StyledListItemText 
                primary={authorName}
                secondary={text}
                color='primary'/>
            </Paper>
          )
        }
        { image && imageOnly && <StyledListItemText primary={authorName} /> }
      </ListItem>
      {
        image && <StyledImage src={image} />
      }
    </>
    )
}