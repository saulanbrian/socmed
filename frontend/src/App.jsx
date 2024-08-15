import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Login,{LoginAction} from './authentication/pages/login.jsx'
import Signup,{SignupAction} from './authentication/pages/signup.jsx'
import Logout from './authentication/pages/logout.jsx'
import Feed from './post/pages/feed.jsx'
import ProfilePreview from './profile/pages/preview.jsx'
import ProfileCreation,{ProfileCreationAction} from './profile/pages/create.jsx'
import PostCreationPage from './post/pages/postcreation.jsx'
import Core from './core/components/core.jsx'

import AuthWrapper from './authentication/components/authWrapper.jsx'

import { AuthContextProvider } from './authentication/context/authContext.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthWrapper><Core /></AuthWrapper>,
    children:[
      {
        path:'',
        element:<Feed />
      },
      {
        path:'post/create',
        element:<AuthWrapper><PostCreationPage /></AuthWrapper>
      },
      ]
  },
  {
    path:'profile',
    element:<ProfilePreview />,
  },
  {
    path:'profile/create/',
    element:<ProfileCreation />,
    action:ProfileCreationAction
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
const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme} >
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
