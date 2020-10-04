import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'react-bootstrap';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';


import './App.css';

function App() {
  
  return (
   
    <Router>
      <Navbar/>
      <Container fluid>
    <div className="App">
      <Route path = "/" exact component = {Main}/>
      <Route path = '/login' component = {Login}/> 
      <Route path = '/register' component = {Register}/>

    </div>
    </Container>
    </Router>
    
  );
}

export default App;
