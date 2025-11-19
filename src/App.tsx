
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Error from './components/Error'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import LandingPage from './Pages/LandingPage'
import { AboutPage } from './Pages/AboutPage'
import { Verification } from './components/auth/Verification'
import { Toaster } from 'sonner'
import AdminDashboard from './dashboard/AdminDashboard/content/AdminDashboard'
import UserDashboard from './dashboard/UserDashboard/content/UserDashboard'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import Todos from './dashboard/AdminDashboard/content/Todos/Todos'
import { CreateTodo } from './dashboard/AdminDashboard/content/Todos/CreateTodo'
import { Users } from './dashboard/AdminDashboard/content/Users/Users'
import { Profile } from './components/profile/Profile'
import UserTodo from './dashboard/UserDashboard/content/Todos/UserTodo'


function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin')
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user')
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/verify',
      element: <Verification />
    },
    {
      path: '*',
      element: <Error />
    },
    // admin dashboard
    {
      path: '/admin/dashboard/',
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: 'todos',
          element: <Todos />
        },
        {
          path: 'create-todos',
          element: <CreateTodo />
        },

        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'analytics',
          element: <h1>Our analytics</h1>
        },

      ]
    },

    // user dashboard
    {
      path: '/user/dashboard/',
      element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
          path: 'todos',
          element: <UserTodo/>
        },
        {
          path: 'profile',
          element: <Profile />
        },

      ]
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' richColors />

    </>
  )
}

export default App
