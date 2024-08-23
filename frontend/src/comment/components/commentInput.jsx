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
import { useAuthContext } from '../../authentication/context/authContext.jsx';
import { useNavigate } from 'react-router-dom';


const StyledPaper = styled(Paper)(({theme,...props}) => ({
  boxShadow:'none',
  bottom:'0',
  borderRadius:0,
  width:'100%',
}))

const ActionArea = styled(Box)({
  display:'flex',
  flexWrap:'nowrap',
  width:'100%',
  justifyContent:'flex-end',
  gap:4
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
      <Box sx={{width:'100%',padding:2}}>
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
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { 
    mutate,
    isPending, 
    error,
    isSuccess,
    success
  } = useAddComment(postId)
  
  const imageRef = useRef(null)
  const [text,setText] = useState('')
  const [imgSrc,setImgSrc] = useState(null)
  
  useEffect(() => {
    if (isSuccess || success) {
      setText('')
      setImgSrc(null)
    }
  },[isSuccess,success])
  
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
    !isAuthenticated && navigate('/login')
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
        <TextField 
          placeholder='comment'
          variant='outlined'
          size='small'
          name='text'
          sx={{outline:'none',width:'60%' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
        <IconButton onClick={triggerInput}>
          <FilterSharpIcon />
        </IconButton>
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

