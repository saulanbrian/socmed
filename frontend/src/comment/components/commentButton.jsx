import CommentDrawer from './drawer.jsx'
import { Button } from '@mui/material'

import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';

import { styled } from '@mui/system'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'


const StyledButton = styled(Button)({
  fontWeight:'Light',
  textTransform:'none'
})


export default function CommentButton({postId,clickFn}){
  
  const [open,setOpen] = useState(false)
  
  const wideScreen = useMediaQuery((theme) => theme.breakpoints.up('md'))
  
  function hanldeClick(){
    clickFn? clickFn(): setOpen(true)
  }
  
  function handleClose(){
    setOpen(false)
  }
  
  return (
    <>
      <StyledButton 
        startIcon={<ChatBubbleOutlineSharpIcon/>}
        onClick={hanldeClick}
        color='inherit'>
        comment
      </StyledButton>
      { 
        open && (
          <CommentDrawer open={open} onClose={handleClose} postId={postId}/>
        )
      }
    </>
    ) 
}