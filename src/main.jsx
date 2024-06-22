import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Register from './components/Register/Register.jsx';
import Context, { AuthContext } from './Context/Context.jsx';
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
import MyTasks from './components/TaskCreator/MyTasks.jsx';
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import MyList from './components/Worker/MyList.jsx';
import TaskDetails from './components/Worker/TaskDetails.jsx';
import MySubmissions from './components/Worker/MySubmissions.jsx';
import Purchase from './components/TaskCreator/Purchase.jsx';
import PaymentHistory from './components/TaskCreator/PaymentHistory.jsx';
import Withdrawals from './components/Worker/Withdrawals.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AdminHome from './components/Admin/AdminHome.jsx';
import AdminManageUsers from './components/Admin/AdminManageUsers.jsx';
import AdminManageTasks from './components/Admin/AdminManageTasks.jsx';
import RoleBasedRoute from './components/Hooks/RoleBasedRoute.jsx';



const queryClient = new QueryClient();
  



const router = createBrowserRouter(
  [
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
    element:<PrivateRoute><RoleBasedRoute role='worker'><WorkerDashboard></WorkerDashboard></RoleBasedRoute></PrivateRoute>,
    children:[
      {
        path:"",
        element:<WorkerHome></WorkerHome>
      },
      {
        path:"mylist",
        element:<MyList></MyList>
      },
      {
        path:'mylist/:id',
        element:<PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-ebon.vercel.app/tasks/${params.id}`)
      },
      {
        path:'mysubmissions',
        element:<MySubmissions></MySubmissions>
      },
      {
        path:'withdraw',
        element:<PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>
      }
    ]
  },
  {
    path:'taskCreatordashboard',
    element:<PrivateRoute><RoleBasedRoute role='taskCreator'><TaskCreatorDashboard></TaskCreatorDashboard></RoleBasedRoute></PrivateRoute>,
    children:[
      {
        path:"",
        element:<PrivateRoute><TaskCreatorHome></TaskCreatorHome></PrivateRoute>
      },
      {
        path:'addtask',
        element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
      },
      {
        path:'mytasks',
        element:<PrivateRoute><MyTasks></MyTasks></PrivateRoute>
      },
      {
        path:'purchase',
        element:<PrivateRoute><Purchase></Purchase></PrivateRoute>
      },
      {
        path:'history',
        element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      }
    ]
  },
  {
    path:'admindashboard',
    element:<PrivateRoute><RoleBasedRoute role='Admin'><AdminDashboard></AdminDashboard></RoleBasedRoute></PrivateRoute>,
    children:[
      {
        path:"",
        element:<AdminHome></AdminHome>
      },{
        path:'manageUsers',
        element:<PrivateRoute><AdminManageUsers></AdminManageUsers></PrivateRoute>
      },
      {
        path:'manageTasks',
        element:<PrivateRoute><AdminManageTasks></AdminManageTasks></PrivateRoute>
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
