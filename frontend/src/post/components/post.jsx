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
import ShareSharpIcon from '@mui/icons-material/ShareSharp';

import CommentButton from '../../comment/components/commentButton.jsx'
import CommentCollapse from '../../comment/components/collapse.jsx'

import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLikePost, useUnlikePost } from '../queries/likedposts.jsx'
import { useMediaQuery } from '@mui/material'

import { styled } from '@mui/system'

import './post.css'


const StyledCard = styled(Card)({
  boxShadow:'none',
  marginBottom:3,
})

const StyledCardActions = styled(CardActions)({
  borderTop:'1px solid #353535cf',
  borderBottom:'1px solid #353535cf',
  padding:1,
  '& > *':{
    flex:1
  }
})

const StyledButton = styled(Button)({
  fontWeight:'Light',
  textTransform:'none'
})

const titleProps = {
  fontSize:'1rem'
}


export default function Post({caption, id, isLiked, likeCounts, image, authorProfile,authorName,authorId}){
  
  const baseUrl = import.meta.env.VITE_API_URL
  
  const collapseComment = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  
  const [liked,setLiked] = useState(isLiked)
  const [likes,setLikes] = useState(likeCounts)
  
  const [collapse,setCollapse] = useState(false)
  
  function openCollapse(){
    setCollapse(true)
  }
  
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
  
  function handleCollapse(){
    setCollapse(!collapse)
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
      <CardContent sx={{padding:'10px',margin:0}}>
        <Typography align='left' variant='body2'>
          { caption }
        </Typography>
      </CardContent>
      { 
        image && (
          <CardMedia 
            className='post-image'
            component='img'
            src={image} 
            />
        )
      }
      <StyledCardActions >
        <StyledButton 
          color={liked? 'primary': 'inherit'}
          onClick={handleClick} 
          disabled={unliking || liking}
          startIcon={ liked? (
            <FavoriteSharpIcon/>
            ): (
            <FavoriteBorderSharpIcon/>
            )
          }>
          { likes }
        </StyledButton>
        <CommentButton 
          postId={id} 
          clickFn={collapseComment && handleCollapse}/>
        <StyledButton color='inherit' startIcon={<ShareSharpIcon/>}>
          share
        </StyledButton>
      </StyledCardActions>
      { collapseComment && <CommentCollapse isIn={collapse} postId={id}/> }
    </StyledCard>
    )
}
