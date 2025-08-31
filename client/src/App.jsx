import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OfficerTouristRegistration from './components/OffisirRgister'
import { ToastContainer } from 'react-toastify'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ToastContainer />
     <OfficerTouristRegistration/>
    </>
  )
}

export default App
