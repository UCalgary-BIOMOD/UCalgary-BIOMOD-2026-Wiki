
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "/src/features/test/Test.jsx" 
import Home from "/src/features/home/Home.jsx"
import Notebook from "@/features/notebook/Notebook.jsx"
import NavBar from "/src/Components/NavBar.jsx"
import ErrorPage from "/src/features/error/Error.jsx"
import Project from "/src/features/project/Project.jsx"
import Description from "/src/features/description/Description.jsx"
import Modelling from "/src/features/modelling/Modelling.jsx"
import Experiments from "/src/features/experiments/Experiments.jsx"
import ELSI from "/src/features/elsi/ELSI.jsx"
import Team from "/src/features/team/Team.jsx"
function App() {
  

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/test" element = {<Test />} />
        <Route path = "/notebook" element = {<Notebook />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path = "/project" element={<Project/>}/>
        <Route path = "/description" element = {<Description/>}/>
        <Route path = "/modelling" element = {<Modelling/>}/>
        <Route path = "/experiments" element = {<Experiments/>}/>
        <Route path = "/elsi" element = {<ELSI/>}/>
        <Route path = "/team" element = {<Team/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
