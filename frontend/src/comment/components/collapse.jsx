import { 
  Collapse,
  CardContent,
  List,
  useMediaQuery
} from '@mui/material'
import Comment from './comment.jsx'

import { useGetComments } from '../queries/comments.jsx'
import { useEffect } from 'react'

export default function CommentCollapse({isIn,postId}){
  
  const { data, isLoading, error} = useGetComments(postId)
  
  useEffect(() => {
    data && console.log(data)
  },[data])
  
  
  return (
    <Collapse in={isIn} timeout={{
      enter:800,
      exit:1300
    }}>
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
              likes={comment.like_counts} />
              ))
          }
        </List>
      </CardContent>
    </Collapse>
    )
}