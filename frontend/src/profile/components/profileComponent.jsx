import InfiniteScroll from 'react-infinite-scroll-component'
import { 
  Box, 
  Paper,
  Avatar,
  useMediaQuery,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'

import Post from '../../post/components/post.jsx'

import { useGetProfile } from '../queries/profile.jsx'
import { useGetPostsByProfileId } from '../queries/profilePosts.jsx'

import { useEffect, useState} from 'react'


const StyledBox = styled(Box)(({theme}) => ({
  maxHeight:'100vh',
  width:'45vw',
  minWidth:'45vw !important',
  [theme.breakpoints.down('sm')]:{
    width:'100vw',
    maxHeight:'100%',
  },
  [theme.breakpoints.up('md')]:{
    overflow:'auto'
  }
}))


const StyledMainBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexWrap:'wrap',
  gap:2,
  [theme.breakpoints.down('sm')]:{
    maxHeight:'100vh',
    overflow:'auto'
  }
}))


const StyledPaper = styled(Paper)(({theme,width}) => ({
  flexGrow:1,
  padding:8,
  height:'fit-content',
  [theme.breakpoints.down('sm')]:{
    width:'100vw',
    boxShadow:'none',
    border:'none'
  }
}))


const StyledAvatar = styled(Avatar)(({theme}) => ({
  width:100,
  height:100,
  [theme.breakpoints.down('sm')]:{
    height:150,
    width:150
  },
}))


function Side({profile}){
  
  
  
  return (
    <StyledPaper>
      <StyledAvatar src={profile?.picture}/>
      <Button>follow</Button>
      <p>{profile?.followers_length} followers</p>
    </StyledPaper>
    )
}


export default function ProfileComponent({profileId}){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [enabled,setEnabled] = useState(false)
  
  const {
    isLoading,
    error,
    data:profile,
    isSuccess:profileFetched
  } = useGetProfile(profileId && profileId)
  
  const {
    isFetching:fetchingPosts,
    error:failedFetchingPosts,
    data:posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    success
  } = useGetPostsByProfileId(profileId,enabled)
  
  useEffect(() => {
    profileFetched && setEnabled(true)
  },[profileFetched])
  
  useEffect(() => {
    success && console.log(posts)
  },[posts])
  
  function getDataLength(data){
    let total = 0
    
    for (let page of data.pages){
      total += page.results.length
    }
    
    return total
  }
  
  return (
    <StyledMainBox id='outerMostDiv'>
      <Side profile={profile} />
      { posts && posts?.pages.filter(post => post !== undefined).length >= 1? (
        <StyledBox id='scrollableDiv'>
          <InfiniteScroll
            dataLength={success? getDataLength(posts): 0}
            hasMore={hasNextPage}
            next={fetchNextPage}
            endMessage={<p>no more post</p>}
            loader={<p>loading...</p>}
            scrollableTarget={onSmallScreen? 'outerMostDiv': 'scrollableDiv'}>
            { posts.pages.map(page => {
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
            } )}
          </InfiniteScroll>
        </StyledBox>
      ): fetchingPosts && !isFetchingNextPage? <StyledBox>wait</StyledBox>: <StyledBox>an error has occured</StyledBox> }
    </StyledMainBox>
  )
}