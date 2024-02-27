import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Body from './components/Body';
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
            path:'edit-profile',
            element:<Profile/>
          },
          {
            path:'appointment',
            element:<Appointment/>
          },
          {
            path:'change-password',
            element:<ChangePassword/>
          }
        ]
      }
    ],
    errorElement:<Error/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
