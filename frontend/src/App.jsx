import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Login,{LoginAction} from './authentication/pages/login.jsx'
import Signup,{SignupAction} from './authentication/pages/signup.jsx'
import Logout from './authentication/pages/logout.jsx'
import Home from './home/pages/home.jsx'
import ProfilePreview from './profile/pages/preview.jsx'
import ProfileCreation from './profile/pages/create.jsx'

import AuthWrapper from './authentication/components/authWrapper.jsx'

import { AuthContextProvider } from './authentication/context/authContext.jsx'

const router = createBrowserRouter([
  {
    path:'',
    element:<AuthWrapper><Home /></AuthWrapper>
  },
  {
    path:'profile',
    element:<h1>you are here because you already have a profile</h1>,
  },
  {
    path:'profile/create/',
    element:<ProfileCreation />
  },
  {
    path:'profile/:id',
    element:<ProfilePreview />
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
  
const client = new QueryClient()

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
