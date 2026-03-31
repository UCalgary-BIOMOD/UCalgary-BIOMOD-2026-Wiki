import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "/src/features/test/Test.jsx" 
import Home from "/src/features/home/Home.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Test />} />
        <Route path = "/home" element = {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
