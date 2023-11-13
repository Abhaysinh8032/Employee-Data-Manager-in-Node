import Form from "./components/Form";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import View from "./components/View";
import Update from "./components/Update";

import { BrowserRouter ,Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/View" element={<View/>}/>
        <Route path="/update" element={<Update/>}/>
        <Route path="*" element={<Form/>}/>

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
