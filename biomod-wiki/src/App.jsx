
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "/src/features/test/Test.jsx" 
import Home from "/src/features/home/Home.jsx"
import Notebook from "@/features/notebook/Notebook.jsx"
import NavBar from "/src/Components/NavBar.jsx"
import ErrorPage from "/src/features/error/Error.jsx"
function App() {
  

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/test" element = {<Test />} />
        <Route path = "/notebook" element = {<Notebook />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
