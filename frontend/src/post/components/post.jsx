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
import { useActionData, useNavigate } from 'react-router-dom'
import { useLikePost, useUnlikePost } from '../queries/likedposts.jsx'
import { useMediaQuery } from '@mui/material'

import { styled } from '@mui/system'

import './post.css'
import { useAuthContext } from '../../authentication/context/authContext.jsx';


const StyledCard = styled(Card)(({theme}) => ({
  boxShadow:'none',
  padding:'1rem',
  display:'flex',
  flexDirection:'column',
  gap:'4px'
}))

const StyledCardActions = styled(CardActions)(({theme}) =>({
  padding:'0.25rem',
  display:'flex',
  justifyContent:'space-around',
  '& > *':{
    flex:1,
    padding:0
  }
}))

const StyledButton = styled(Button)({
  fontWeight:500,
  textTransform:'none'
})

const titleProps = {
  fontWeight:'520',
  fontSize:'1rem'
}


export default function Post({caption, id, isLiked, likeCounts, image, authorProfile,authorName,authorId,}){
  
  const baseUrl = import.meta.env.VITE_API_URL

  const { isAuthenticated } = useAuthContext()
  
  const collapseComment = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const navigate = useNavigate()
  
  const [liked,setLiked] = useState(isLiked)
  const [likes,setLikes] = useState(likeCounts)
  
  const [collapse,setCollapse] = useState(false)
  
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
  

  function openCollapse(){
    setCollapse(true)
  }

  async function handleClick(e){
    e.preventDefault();
    if (isAuthenticated){
      liked? await unlike(id): await like(id)
      liked? setLikes(prev => prev - 1): setLikes(prev => prev + 1)
      setLiked(!liked)
    }else navigate('/login')
  }
  
  function handleCollapse(){
    setCollapse(!collapse)
  }
  
  
  return (
    <StyledCard component={Box}>
      <CardHeader
        sx={{padding:'0.25rem'}}
        avatar={<Avatar src={baseUrl + authorProfile} sx={{cursor:'pointer'}} onClick={() => navigate(`/${authorId}`)} />}
        title={authorName}
        titleTypographyProps={titleProps}
        />
      { caption && (
        <CardContent sx={{padding:'0.25rem'}}>
          <Typography align='left' variant='body2'>
            { caption }
          </Typography>
        </CardContent>
      ) }

      { 
        image && (
          <CardMedia 
            className='post-image'
            component='img'
            src={image} 
            />
        )
      }

      <StyledCardActions>
        <StyledButton 
          color={liked? 'primary': 'inherit'}
          onClick={handleClick} 
          disabled={unliking || liking}
          startIcon={ liked? <FavoriteSharpIcon/> : <FavoriteBorderSharpIcon/> }
          disableElevation>
            { likes }
        </StyledButton>
        <CommentButton 
          postId={id} 
          clickFn={collapseComment && handleCollapse}/>
        <StyledButton color='inherit' startIcon={<ShareSharpIcon/>} disableElevation>
          share
        </StyledButton>
      </StyledCardActions>
      { collapseComment && collapse && <CommentCollapse isIn={collapse} postId={id}/> }
    </StyledCard>
    )
}
