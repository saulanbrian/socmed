import { 
  Collapse,
  CardContent,
  List,
  CardActions,
  useMediaQuery
} from '@mui/material'
import Comment from './comment.jsx'
import CommentInput from './commentInput.jsx'

import { useGetComments } from '../queries/comments.jsx'
import { useEffect,useState } from 'react'

export default function CommentCollapse({isIn,postId}){
  
  const [enabled,setEnabled] = useState(false)
  const { data, isLoading, error} = useGetComments(postId)
  
  useEffect(() => {
    data && console.log(data)
  },[data])
  
  function enableQuery(){
    setEnabled(true)
  }
  
  return (
    <Collapse 
      in={isIn} 
      addEndListener={enableQuery}>
      <CardContent>
        <List>
          {
            data && data.results.map((comment) => (
            <Comment 
              key={comment.id}
              authorId={comment.author_id}
              authorName={comment.author_name}
              authorProfile={comment.author_profile}
              text={comment.text}
              likes={comment.like_counts} 
              image={comment.image}/>
              ))
          }
        </List>
      </CardContent>
      <CardActions>
        <CommentInput postId={postId} />
      </CardActions>
    </Collapse>
    )
}