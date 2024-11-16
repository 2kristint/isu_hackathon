import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppointmentForm from './AppointmentForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppointmentForm />
    </>
  )
}

export default App
