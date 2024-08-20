import InfiniteScroll from "react-infinite-scroll-component";
import { useGetUserPosts } from "../../user/queries/user";
import { useEffect } from "react";
import Post from "./post";

export default function UserPostsInfiniteScroll({userId,scrollableTarget}){

    const {
      isFetching,
      isFecthingNextPage,
      data,
      hasNextPage,
      fetchNextPage,
      error,
      success 
    } = useGetUserPosts(userId)  

    useEffect(() => {
      data && console.log(data)
    },[data])

    const firstPageUp = Boolean(data?.pages[0] !== undefined)

    function getDataLength(data){
      console.log(data)
      let total = 0
      for (let page of data?.pages){
        total += page.results.length
      }
      return total
    }
    
    return firstPageUp? (
      <InfiniteScroll
          dataLength={data? getDataLength(data): 0}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={<p>loading...</p>}
          endMessage={<p>that's it</p>}
          scrollableTarget={scrollableTarget}>
       { data && data?.pages.map(page => {
          return page.results.map(post => (
            <Post 
              key={post.id}
              caption={post.caption}
              id={post.id}
              isLiked={post.is_liked}
              likeCounts={post.like_counts}
              image={post.image}
              authorProfile={post.author_profile}
              authorName={post.author_name}
              authorId={post.author_id} />
          )) })
       }
      </InfiniteScroll>
    ): error? (
      <p>an error has occured</p>
    ): error && (
      <p>just a second</p>
    )
}