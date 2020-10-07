import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {LogContext} from '../LogContextProvider'


import './Navbar.css'

function LogoutButton(props){
        
    if(props.val === 1){
    return (
        
            <button className="btn btn-warning">
                <Link to ='/' style={{textDecoration: 'none', color: 'black'}}>Logout</Link>
            </button>
    
    )}
    else{
        return(
            <div></div>
        )
    }
}

function NavbarLinks(props) {


        return (
            <div className = "navbar-collapse navLinks">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to ="/" className="nav-link">Home</Link>
                        </li>
                    </ul>
                </div>
        )

    }

    



export default class Navbar extends Component{
    static contextType = LogContext;

    constructor(props){
        super(props);

        this.state = ({
            log: 0
        });

        this.onClickLogout = this.onClickLogout.bind(this);

    }
    componentDidMount(){
    
            this.setState({log: this.context.log})
         
        
    }
    
    
    onClickLogout (e){
        if(localStorage.getItem('auth-token')){
        localStorage.removeItem('auth-token');
        this.context.notLoggedIn();
        this.setState({
            log: this.context.log
        })
        }
    }
        

    render(){
        return(
            <LogContext.Consumer>
                {(context) => ( 
                    <React.Fragment>
                        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                            <Link to = '/' className="navbar-brand" > MovieBase</Link>
                            <NavbarLinks val = {context.log}/>
                            <div onClick = {this.onClickLogout}>
                            <LogoutButton val = {context.log} />
                            </div>      
                        </nav>
                    </React.Fragment>
                 )}
            </LogContext.Consumer>

        ) 
    }
}

