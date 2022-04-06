import React from "react";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from './components/Navbar';
import Profile from "./components/Profile";
import UpdateList from "./components/UpdateList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Contact" element={<Contact />} /> 
          <Route exact path="/UpdateList" element={<UpdateList />} />
          <Route path="*" element={ <Navigate to='/' />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
