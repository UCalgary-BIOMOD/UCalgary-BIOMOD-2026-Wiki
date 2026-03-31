
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "/src/features/test/Test.jsx" 
import Home from "/src/features/home/Home.jsx"
import NavBar from "/src/Components/NavBar.jsx"
function App() {
  

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path = "/test" element = {<Test />} />
        <Route path = "/home" element = {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
