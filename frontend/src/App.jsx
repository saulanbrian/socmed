import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login,{LoginAction} from './authentication/pages/login.jsx'
import Signup,{SignupAction} from './authentication/pages/signup.jsx'
import Logout from './authentication/pages/logout.jsx'
import Home from './home/pages/home.jsx'

import AuthWrapper from './authentication/components/authWrapper.jsx'

import { AuthContextProvider } from './authentication/context/authContext.jsx'
import { UserContextProvider } from './user/context/userContext.jsx'

const router = createBrowserRouter([
  {
    path:'',
    element:<AuthWrapper><Home /></AuthWrapper>
  },
  {
    path:'profile',
    element:<h1>setup profile first</h1>
  },
  {
    path:'login',
    element:<Login />,
    action:LoginAction
  },
  {
    path:'signup',
    element:<Signup />,
    action:SignupAction
  },
  {
    path:'logout',
    element:<Logout />
  }
  ])

function App() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </UserContextProvider>
  )
}

export default App
