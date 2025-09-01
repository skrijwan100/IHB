import React from 'react'
import{ useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
     <ToastContainer />
     <Outlet />
    </>
  )
}

export default App
