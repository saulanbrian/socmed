import React from 'react';
import { SwipeableDrawer, List, Drawer} from '@mui/material';
import Comment from './comment.jsx'
import CommentInput from './commentInput.jsx'

import { styled } from '@mui/system';

import { useGetComments } from '../queries/comments.jsx'
import { useEffect } from 'react'

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    height:400,
    maxHeight: 400,
    maxWidth:400
  },
  '& .MuiBackdrop-root':{
    maxWidth:400
  }
})

export default function CommentDrawer({ open, onClose ,postId}) {
  
  const { 
    data, 
    isLoading, 
    error } = useGetComments(postId)
  
  useEffect(() => {
    data && console.log(data)
    console.log('re-rendered')
  },[data])
  
  return (
    <StyledDrawer 
      open={open} 
      onClose={onClose}
      anchor='bottom'>
      <List>
        { data && data.results.length >= 1? data.results.map(
          (comment) => (
            <Comment 
              key={comment.id}
              authorId={comment.author_id}
              authorName={comment.author_name}
              authorProfile={comment.author_profile}
              text={comment.text}
              likes={comment.like_counts}
              image={comment.image}/>
            )
          ): <p>there are no comments yet</p>
        }
      </List>
      <CommentInput postId={postId}/>
    </StyledDrawer>
  );
}