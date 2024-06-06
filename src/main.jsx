import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Register from './components/Register/Register.jsx';
import Context from './Context/Context.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WorkerDashboard from './components/Home/WorkerDashboard.jsx';
import TaskCreatorDashboard from './components/Home/TaskCreatorDashboard.jsx';
// import AdminDashboard from './components/Home/AdminDashboard.jsx';
import WorkerHome from './components/Worker/WorkerHome.jsx';
import TaskCreatorHome from './components/TaskCreator/TaskCreatorHome.jsx';
import AddTask from './components/TaskCreator/AddTask.jsx';
import User from './components/Home/User.jsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/register',
        element:<Register></Register>
      },{
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/user',
        element:<User></User>
      },
      
    ]
  },
  {
    path:'workerdashboard',
    element:<WorkerDashboard></WorkerDashboard>,
    children:[
      {
        path:"workerhome",
        element:<WorkerHome></WorkerHome>
      }
    ]
  },
  {
    path:'taskCreatordashboard',
    element:<TaskCreatorDashboard></TaskCreatorDashboard>,
    children:[
      {
        path:"taskCreatordashboard",
        element:<TaskCreatorHome></TaskCreatorHome>
      },
      {
        path:'addtask',
        element:<AddTask></AddTask>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </Context>
  </React.StrictMode>,
)
