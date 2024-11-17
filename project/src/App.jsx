import { useState } from 'react'
import './App.css'
import FormsTogether from './formsTogether'
import Scheduler from './scheduler'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormsTogether />} />
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App
