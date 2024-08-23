import { 
  Collapse,
  CardContent,
  List,
  CardActions,
  useMediaQuery,
  Button,
  Typography
} from '@mui/material'

import { styled  } from '@mui/system'

import Comment from './comment.jsx'
import CommentInput from './commentInput.jsx'

import { useGetComments } from '../queries/comments.jsx'
import { useEffect,useState } from 'react'


const StyledCardContent = styled(CardContent)(({theme}) => ({
  padding:'0.25rem',
  minHeight:'50'
}))

export default function CommentCollapse({isIn,postId}){
  
  const { 
    data, 
    isFetching, 
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    success
  } = useGetComments(postId,3)

  
  
  return (
    <Collapse in={isIn} >
      <StyledCardContent>
      { isFetching && !isFetchingNextPage? <p>wait lang gar</p>
        : error? <p>an error has occured</p>
        : data?.pages.filter(page => page.results.length >= 1).length >= 1? (
            data.pages.map(page => {
              return page.results.map(comment => (
                <Comment
                  key={comment.id}
                  authorId={comment.author_id}
                  authorProfile={comment.author_profile}
                  authorName={comment.author_name}
                  text={comment.text}
                  image={comment.image}
                  likes={comment.like_counts} 
                  sx={{paddingLeft:4}}/>
              ))
            }) )
        : <p style={{margin:32,textAlign:'center',fontSize:'0.75rem'}}>no comments yet</p>} 
      { 
        hasNextPage && (
        <Button onClick={fetchNextPage} component='a' sx={{fontWeight:560}}>
          show more
        </Button>
        )
      }
      </StyledCardContent>
      <CardActions sx={{padding:'0.25rem'}}>
        <CommentInput postId={postId} />
      </CardActions>
    </Collapse>
    )
}