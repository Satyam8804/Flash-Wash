import { useState } from 'react';
import './App.css';

import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './utils/AuthContext';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthProvider>
        <Toaster/>
        <div className="w-screen App" >
        <Navbar/>
        <div className="w-screen bg-[#fdfdfe] min-h-full flex justify-center">
        <Outlet/>
        </div>
    </div>
    </AuthProvider>
  
  );
}

export default App;
