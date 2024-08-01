import { useGetPosts } from '../queries/posts.jsx'

import Post from '../components/post.jsx'
import LikedPostContainer from '../components/likedpostscontainer.jsx'
import PostCreationButton from '../components/postcreationbutton.jsx'


function Feed(){
  const {isLoading,data:posts,isError} = useGetPosts()
  
  if (isLoading) return <p>loading...</p>
  if (isError) return <p>error</p>

  return (
    <>
      {
        posts.length >= 1? (
            posts.map(post => (
              <Post key={post.id} 
                    caption={post.caption}
                    id={post.id}
                    isLiked={post.is_liked}
                    likeCounts={post.like_counts}
                    image={post.image}
                    authorProfile={post.author_profile}
                    authorName={post.author_name}
                    authorId={post.author_id}/>
            ))
          ):(
            <p>you're all caught up</p>
          )
      }
      <PostCreationButton />
      <hr />
    </>
    )
}

export default Feed;