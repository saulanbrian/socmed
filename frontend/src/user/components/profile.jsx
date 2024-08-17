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

import {useGetUserPosts} from '../queries/user.jsx'


const MainBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexWrap:'wrap'
}))

const StyledPaper = styled(Paper)(({theme}) => ({
  flexGrow:1,
  gap:5,
  [theme.breakpoints.down('sm')]:{
    width:'100%'
  }
}))

const StyledPostsBox = styled(Box)(({theme}) => ({
  width:'55vw',
  [theme.breakpoints.down('sm')]:{
    width:'100%',
    maxHeight:'100vh',
    overflow:'auto'
  }
}))


function UserInfo({userInfo}){
  return (
    <StyledPaper>
      { userInfo.display_name }
    </StyledPaper>
  )
}


export default function ProfileComponent({userInfo}){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints
  .down('sm'))
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
              loader={<p>loading..</p>}
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