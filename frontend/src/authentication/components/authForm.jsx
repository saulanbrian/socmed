import { Form,useNavigate,Link } from 'react-router-dom'

export default function AuthForm({userAction}){
  const navigate = useNavigate()
  
  return (
    <Form action='' method='post'>
      <input name="username" placeholder="username" />
      <input name="password" placeholder="password" type="password"/>
      { userAction === 'signup' &&
        <>
          <input name="confirmation" placeholder="confirmation" type="password" />
          <input name="display_name" placeholder="display name" />
        </>}
      <button type='submit'>{userAction}</button>
      {
        userAction === 'login'? 
        <p>don't have an account? click 
          <Link to='/signup'>here</Link> to signup
        </p>:
        <p>already have an account? click
          <Link to='/login'>here</Link> to login
        </p>
      }
    </Form>
    )
}