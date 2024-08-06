import { useInfinitePosts } from '../queries/posts.jsx'

import Post from '../components/post.jsx'
import LikedPostContainer from '../components/likedpostscontainer.jsx'
import PostCreationButton from '../components/postcreationbutton.jsx'
import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect } from 'react'

// function Feed(){
//   const {isLoading,data:posts,isError} = useGetPosts()
//   
//   if (isLoading) return <p>loading...</p>
//   if (isError) return <p>error</p>
// 
//   return (
//     <>
//       {
//         posts.length >= 1? (
//             posts.map(post => (
//               <Post key={post.id} 
//                     caption={post.caption}
//                     id={post.id}
//                     isLiked={post.is_liked}
//                     likeCounts={post.like_counts}
//                     image={post.image}
//                     authorProfile={post.author_profile}
//                     authorName={post.author_name}
//                     authorId={post.author_id}/>
//             ))
//           ):(
//             <p>you're all caught up</p>
//           )
//       }
//      
//       <hr />
//     </>
//     )
// }

function Feed(){
  
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error
  } = useInfinitePosts()
  
  useEffect(() => {
    data && console.log(data)
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
    <>
      <InfiniteScroll 
        dataLength={getDataLength(data)}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<p>loading...</p>}
        endMessage={
          <p>no more data</p>
        }>
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
                    authorName={post.author_name}
                    authorId={post.author_id}/>
              ))
          }) }
        </InfiniteScroll>
        <PostCreationButton />
    </>
    ): isFetching? <p>wait a minute</p>: <p>no post</p>
  
}

export default Feed;