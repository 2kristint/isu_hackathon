import { useState } from 'react'
import './App.css'
import FormsTogether from './formsTogether'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormsTogether />
    </>
  )
}

export default App
