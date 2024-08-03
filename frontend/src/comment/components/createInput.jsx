import api from '../../api.jsx'

import { useAddComment } from '../queries/comments.jsx'

export default function CommentInput({postId}){
  
  const { mutate, isPending, error } = useAddComment(postId)
  
  function sendComment(e){
    e.preventDefault()
    const text = e.target.text.value
    mutate(text)
  }
  
  
  return (
    <form onSubmit={onSubmit} method='post'>
      <input name='text' />
      <button type='submit' />
    </form>
  )
}