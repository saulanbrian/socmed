import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Paper,
  Avatar,
  Typography,
  Box,
  Button
} from '@mui/material'

import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import SendSharpIcon from '@mui/icons-material/SendSharp';

import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLikePost, useUnlikePost } from '../queries/likedposts.jsx'

import { styled } from '@mui/system'


const StyledCard = styled(Card)({
  maxWidth:400,
  margin:'3px 0',
  boxShadow:'none'
})

const StyledCardActions = styled(CardActions)({
  borderTop:'1px solid #353535cf',
  padding:1,
  justifyContent:'space-between'
})

const titleProps = {
  fontSize:'1rem'
}

export default function Post({caption, id, isLiked, likeCounts, image, authorProfile,authorName,authorId}){
  
  const baseUrl = import.meta.env.VITE_API_URL
  
  const [liked,setLiked] = useState(isLiked)
  const [likes,setLikes] = useState(likeCounts)
  
  const {
    error:likeFailed,
    isSuccess:likeSuccess,
    isPending:liking,
    mutate:like
  } = useLikePost()
  
  const {
    error:unlikeFailed,
    isSuccess:unlikeSuccess,
    isPending:unliking,
    mutate:unlike
  } = useUnlikePost()
  
  async function handleClick(e){
    e.preventDefault();
    liked? await unlike(id): await like(id)
    liked? setLikes(prev => prev - 1): setLikes(prev => prev + 1)
    setLiked(!liked)
  }
  
  return (
    <StyledCard component={Box}>
      <CardHeader 
        sx={{padding:1}}
        avatar={<Avatar src={baseUrl + authorProfile}/>}
        title={authorName}
        subheader='dxample'
        titleTypographyProps={titleProps}
        />
      <CardContent sx={{padding:'0 5px',margin:0}}>
        <Typography align='left' paragraph variant='body2'>
          { caption }
        </Typography>
      </CardContent>
      { 
        image && (
          <CardMedia 
            component='img'
            src={image} 
            height='300'
            />
        )
      }
      <StyledCardActions >
        <Button 
          color='inherit'
          onClick={handleClick} 
          disabled={unliking || liking}
          startIcon={ liked? (
            <FavoriteSharpIcon/>
            ): (
            <FavoriteBorderSharpIcon/>
            )
          }>
          { likes }
        </Button>
        <Button startIcon={<ChatBubbleOutlineSharpIcon />} color='inherit'>
          comment
        </Button>
        <Button color='inherit'
                startIcon={<SendSharpIcon/>}>
          share
        </Button>
      </StyledCardActions>
    </StyledCard>
    )
}
