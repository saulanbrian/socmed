import {
  Box
} from '@mui/material'

import { styled } from '@mui/system'

import { useInfinitePosts } from '../queries/posts.jsx'

import Post from '../components/post.jsx'
import LikedPostContainer from '../components/likedpostscontainer.jsx'
import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect } from 'react'


const StyledBox = styled(Box)(({theme}) => ({
  height:'100vh',
  maxHeight:'100%',
  overflow:'auto',
  borderRadius:4,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}))


function Feed(){
  
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
    refetch
  } = useInfinitePosts()
  
  useEffect(() => {
    
  },[data])
  
  
  if (error) return <h1>error</h1>
  
  function getDataLength(data){
    let total = 0
    for(let page of data.pages){
      for (let result of page.results){
        total += 1
      }
    }
    return total
  }
  
  return data && data?.pages?.length >= 1? (
    <StyledBox id='scrollableDiv'>
      <InfiniteScroll 
        dataLength={getDataLength(data)}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<p>loading...</p>}
        endMessage={<p>no more data</p>}
        scrollableTarget='scrollableDiv'
        style={{ display: 'flex', flexDirection: 'column', gap:8 }}>
          { data.pages.map((page) => {
            return page.results.map((post) =>(
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
          }) }
        </InfiniteScroll>
    </StyledBox>
    ): isFetching? <p>wait a minute</p>: <p>no post</p>
  
}

export default Feed;