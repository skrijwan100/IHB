import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import userStore from "./store/userStore.js";

function App() {
  const { isLoading, error, message, currentUser } = userStore();

  useEffect(() => {
    currentUser();
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
