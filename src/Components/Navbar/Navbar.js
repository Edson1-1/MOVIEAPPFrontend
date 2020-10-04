import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import './Navbar.css'

function LogoutButton(){
    const onClickLogout = () => {
        if(localStorage.getItem('auth-token')){
        localStorage.removeItem('auth-token');
        window.location.reload(false);
        }
    }
        
    if(localStorage.getItem('auth-token')){
    return (
        <button className="btn btn-warning" onClick= {onClickLogout}>
            <Link to ='/login' style={{textDecoration: 'none', color: 'black'}}>Logout</Link>
            </button>
    )}
    else{
        return(
            <div></div>
        )
    }
}


export default class Navbar extends Component{

    constructor(props){
        super(props);

    }
    

    render(){

        return(
            
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to = '/' className="navbar-brand" > MOVIE APP</Link>
                <div className = "navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to ="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to ="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                </div>
                <LogoutButton/>
                    
            </nav>

        ) 
    }
}

