import React from "react";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import Navbar from './components/Navbar';
import Profile from "./components/Profile";
import UpdateList from "./components/UpdateList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
         <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Blogs" element={<Blog />} /> 
          <Route exact path="/UpdateList" element={<UpdateList />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
