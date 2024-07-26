import { Form } from 'react-router-dom'

export default function ProfileCreationForm(){
  return (
    <Form method='post' action=''>
      <input name='displayName' placeholder='display name' />
      <input name='description' placeholder='description' />
      <button type='submit'>save</button>
    </Form>
  )
}