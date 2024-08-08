import { 
  Collapse,
  CardContent,
  List,
  CardActions,
  useMediaQuery,
  Button
} from '@mui/material'
import Comment from './comment.jsx'
import CommentInput from './commentInput.jsx'

import { useGetComments } from '../queries/comments.jsx'
import { useEffect,useState } from 'react'

export default function CommentCollapse({isIn,postId}){
  
  const [enabled,setEnabled] = useState(false)
  const { 
    data, 
    isFetching, 
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    success
  } = useGetComments(postId,enabled)
  
  useEffect(() => {
    data?.pages && console.log(data)
  },[data])
  
  function enableQuery(){
    setEnabled(true)
  }
  
  return (
    <Collapse 
      in={isIn} 
      addEndListener={enableQuery}>
      <CardContent>
      {
        isFetching && !isFetchingNextPage? (
          <p>wait lang gar</p>
        )
        : error? (
          <p>an error has occured</p>
        )
        : (
          data?.pages.filter(page => page.results.length >= 1).length >= 1? (
            data.pages.map(page => {
              return page.results.map(comment => (
                  <Comment
                    key={comment.id}
                    authorId={comment.author_id}
                    authorProfile={comment.author_profile}
                    authorName={comment.author_name}
                    text={comment.text}
                    image={comment.image}
                    likes={comment.like_counts} />
                ))
              })
          )
          : <p>no comments yet</p>
        )
      }
      { 
        hasNextPage && (
        <Button onClick={fetchNextPage} component='a'>
          show more
        </Button>
        )
      }
      </CardContent>
      <CardActions>
        <CommentInput postId={postId} />
      </CardActions>
    </Collapse>
    )
}