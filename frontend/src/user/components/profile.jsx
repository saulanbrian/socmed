import InfiniteScroll from 'react-infinite-scroll-component'
import { 
  Box, 
  Paper,
  Avatar,
  useMediaQuery,
  Button,
  Typography,
  ListItemButton,
  ListItem,
  List
} from '@mui/material'

import { styled } from '@mui/system'

import Post from '../../post/components/post.jsx'

import {useGetUserPosts} from '../queries/user.jsx'
import { useUserStore } from '../store/userstore.jsx'
import { useAuthContext } from '../../authentication/context/authContext.jsx'
import { useNavigate } from 'react-router-dom'

const MainBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexWrap:'wrap',
  maxHeight:'100vh',
  overflow:'auto',
  background:'#c5c5c5cf',
  [theme.breakpoints.up('md')]:{
    flexWrap:'nowrap'
  }
}))

const StyledPaper = styled(Paper)(({theme}) => ({
  flexGrow:1,
  gap:5,
  padding:'10px 5px',
  display:'flex',
  margin:3,
  flexWrap:'wrap',
  height:'fit-content',
  position:'static !important',
  [theme.breakpoints.down('sm')]:{
    width:'100%'
  }
}))

const StyledPostsBox = styled(Box)(({theme}) => ({
  width:'53vw',
  maxHeight:'100%',
  overflow:'auto',
  padding:3,
  [theme.breakpoints.down('sm')]:{
    width:'100%',
  },
  [theme.breakpoints.up('md')]:{
    maxHeight:'100vh'
  }
}))

const StyledAvatar = styled(Avatar)(({theme}) => ({
  height:150,
  width:150,
}))

const StyledListItemButton = styled(ListItemButton)(({theme,color}) => ({
  borderRadius:'10px',
  display:'flex',
  justifyContent:'center',
  border:`1px solid ${color === 'primary'? theme.palette.primary.main: theme.palette.secondary.main}`,
}))


function UserInfo({userInfo}){
  
  const { id } = userInfo
  const { id:userId } = useUserStore()
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  
  function handleClick(){
    if(isAuthenticated){
      id === userId? navigate('/logout'): alert('do something')
    }else navigate('/login')
  }
  
  return (
    <StyledPaper>
      <StyledAvatar src={userInfo.pfp}/>
      <Box sx={{flexGrow:1}}>
        <List>
          <ListItem>
            <Typography variant='subtitle1' sx={{fontSize:'1.5rem'}}>
              { userInfo.display_name }
            </Typography>
          </ListItem>
          <ListItem sx={{display:'flex',gap:3}}>
            <Typography>
              { userInfo.following_count || 0} following
            </Typography>
            <Typography >
              { userInfo.follower_count || 0} followers
            </Typography>
          </ListItem>
          <ListItem>
            <StyledListItemButton 
              variant='contained' 
              color={id === userId? 'secondary': 'primary'} 
              dense
              onClick={handleClick}>
              <Typography variant='button' color={id === userId? 'secondary': 'primary'}>
                { id === userId? 'logout': 'follow'}
              </Typography>
            </StyledListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box>
        <Typography paragraph sx={{marginLeft:'3px',padding:0}}>
          { userInfo.bio || 'jsksksskskskks' }
        </Typography>
      </Box>
    </StyledPaper>
  )
}


function Loader(){
  return (
      <Box>
        <h1>loading...</h1>
      </Box>
    )
}

export default function ProfileComponent({userInfo}){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { id } = userInfo
  const {
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    data
  } = useGetUserPosts(id)
  
  function getDataLength(data){
    let total = 0
    
    for (let page of data.pages){
      total += page.results.length
    }
    
    return total
  }
  
  return (
    <MainBox id='main-box'>
      <UserInfo userInfo={userInfo} />
      <StyledPostsBox id='posts-box'>
        {
          isFetching && !isFetchingNextPage? (
            <p>fetching</p>
          ): error? (
            <p>an error has occured</p>
          ): data?.pages.some(page => page.results[0] !== undefined)? (
            <InfiniteScroll
              dataLength={getDataLength(data)}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Loader />}
              endMessage={<p>no more posts..</p>}
              scrollableTarget={onSmallScreen? 'main-box': 'posts-box'}>
              { data?.pages.map(page => {
                return page.results.map(post => (
                  <Post 
                    key={post.id} 
                    caption={post.caption}
                    id={post.id}
                    isLiked={post.is_liked}
                    likeCounts={post.like_counts}
                    image={post.image}
                    authorProfile={post.author_profile}
                    authorProfileId={post.author_profile_id}
                    authorName={post.author_name}
                    authorId={post.author_id}/>
                ))
              })}
            </InfiniteScroll>
          ): <p>no posts yet</p>
        }
      </StyledPostsBox>
    </MainBox>
  )
}