import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Body from './Pages/Body';
import AboutUs from './Pages/AboutUs';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Contact from './Pages/Contact';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './Pages/Error';
import UserProfile from './Pages/UserProfile';
import Profile from './Pages/Profile';
import Appointment from './Pages/Appointment';
import ChangePassword from './Pages/ChangePassword';
import Dashboard from './Admin/Dashboard';
import Employee from './Employee/Employee';
import Appointments from './Admin/Appointments';
import Employees from './Admin/Employees';
import ServiceDashBoard from './Pages/ServiceDashBoard';
import Checkout from './Pages/Ckeckout';
import Customers from './Admin/Customers';
import Service from './Admin/Service';
import AssignedWorks from './Employee/AssignedWorks';
import FeedbackForm from './Template/FeedbackForm';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Body/>
      },
      {
        path:'/about',
        element:<AboutUs/>
      },
      {
        path:'/service',
        element:<ServiceDashBoard/>
      },
      {
        path:'/checkout',
        element:<Checkout/>
      },
      {
        path:'/api/v1/users/login',
        element:<SignIn/>
      },
      {
        path:'/api/v1/users/register',
        element : <SignUp/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/api/v1/users/profile/',
        element:<UserProfile/>,
        children:[
          {
            path:'',
            element:<Profile/>
          },
          {
            path:'appointment',
            element:<Appointment/>
          },
          {
            path:'change-password',
            element:<ChangePassword/>
          },
          {
            path:'feedback',
            element:<FeedbackForm/>
          }
        ]
      }
    ],
    errorElement:<Error/>
  },
  {
    path :'/api/v1/admin',
    element:<Dashboard/>,
    children:[
      {
        path:'appointment',
        element:<Appointments/>
      },
      {
        path:'employees',
        element:<Employees/>
      },
      {
        path:'customers',
        element:<Customers/>
      },
      {
        path:'service',
        element:<Service/>
      },
  ]
  },{
    path :'/api/v1/employee',
    element:<Employee/>,
    children:[
      {
        path:'profile',
        element:<Profile/>
      },
      {
        path:'assigned-work',
        element:<AssignedWorks/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
