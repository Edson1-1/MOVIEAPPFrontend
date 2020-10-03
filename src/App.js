import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';


import './App.css';

function App() {
  return (
   

    <Router>
      <Navbar/>
    <div className="App">
      <Route path = '/login' component = {Login}/> 
      <Route path = '/register' component = {Register}/>

    </div>
    </Router>
  );
}

export default App;
