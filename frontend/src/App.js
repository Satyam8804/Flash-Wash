import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <div className="w-screen App">
        <div className="w-full bg-[#fdfdfe] flex justify-center flex-col">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
