import {
  TextField,
  Button,
  List,
  Paper,
  IconButton,
  Box,
  Collapse,
  useMediaQuery
} from '@mui/material'

import SendSharpIcon from '@mui/icons-material/SendSharp'
import FilterSharpIcon from '@mui/icons-material/FilterSharp'
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material'

import { useAddComment } from '../queries/comments.jsx'
import { useRef, useState, useEffect } from 'react'

import api from '../../api.jsx'


const StyledPaper = styled(Paper)(({theme,...props}) => ({
  boxShadow:'none',
  position:props.position,
  bottom:'0',
  borderRadius:0,
  width:'100%',
  borderTop:'1px solid #3d3d3dcf',
}))

const ActionArea = styled(Box)({
  display:'flex',
  flexWrap:'nowrap',
  width:'100%',
  padding:5,
  gap:1,
})

const Input = styled('input')({
  display:'none'
})

const StyledImage = styled('img')(({theme,...props}) =>({
  height:props.size === 'small'? '150px': '200px',
  width:props.size === 'small'? '150px': '200px',
  objectFit:'contain',
  borderRadius:'5px',
  position:'relative',
  border:'1px solid #353535cf'
}))

const RemoveButton = styled(IconButton)(({theme,...props}) => ({
  left:props.imagesize === 'small'? '152px': '190px',
  position:'absolute',
  zIndex:3,
  top:'-1px'
}))

function ImagePreview({src,showImage,size,removeFn}){
  return (
    <Collapse in={showImage}>
      <Box sx={{width:'100%',padding:1}}>
        <RemoveButton 
          imagesize={size} 
          onClick={ () => removeFn() }
          color='secondary'
          size='small'>
          <CloseIcon/>
        </RemoveButton>
        <StyledImage src={src} size={size} />
      </Box>
    </Collapse>
    )
}


export default function CommentInput({postId}){
  
  const onDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  
  const { 
    mutate,
    isPending, 
    error,
    isSuccess
  } = useAddComment(postId)
  
  const imageRef = useRef(null)
  const [text,setText] = useState('')
  const [imgSrc,setImgSrc] = useState(null)
  
  useEffect(() => {
    if (isSuccess) {
      setText('')
      setImgSrc(null)
    }
  },[isSuccess])
  
  function triggerInput(){
    imageRef.current.click()
  }
  
  function removeImage(){
    setImgSrc(null)
  }
  
  function handleChange(e){
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImgSrc(url)
    }
  }
  
  function sendComment(e){
    e.preventDefault()
    const data = new FormData(e.target)
    mutate(data)
  }
  
  return (
    <StyledPaper 
      component='form' 
      onSubmit={sendComment}
      position={onDesktop? 'static': 'fixed'}>
      { imgSrc && (
          <ImagePreview 
            src={imgSrc} 
            showImage={true} size='small'
            removeFn={removeImage}/>
        )
      }
      <ActionArea>
        <Input 
            type='file' 
            ref={imageRef}
            onChange={handleChange}
            name='image'/>
        <IconButton onClick={triggerInput}>
          <FilterSharpIcon />
        </IconButton>
        <TextField 
          placeholder='comment'
          variant='outlined'
          size='small'
          name='text'
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            borderRadius:'50px'
          }}
          />
        <IconButton 
          color='primary' 
          type='submit'
          disabled={!imgSrc && !text.trim()}>
          <SendSharpIcon />
        </IconButton>
      </ActionArea>
    </StyledPaper>
  )
}

