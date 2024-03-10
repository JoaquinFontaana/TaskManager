  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import {createBrowserRouter, RouterProvider} from 'react-router-dom'
  import TaskManager from './pages/taskmanager/TaskManager.jsx'
  import Home from './pages/home/Home.jsx'
  import SignIn from './pages/signin/SignIn.jsx'
  import './index.css' 
  import SignUp from './pages/signup/SignUp.jsx'
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Home/>
    },
    {
      path:'/TaskManager',
      element: <TaskManager/>
    },
    {
      path:'/login',
      element:<SignIn/>
    },
    {path:"/signup",
    element:<SignUp/>
  }
  ])

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
    </React.StrictMode>,
  )
