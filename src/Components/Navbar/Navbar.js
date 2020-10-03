import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Navbar.css'

export default class Navbar extends Component{

    render(){

        return(
            <nav>
                <Link to = '/' > MOVIE APP</Link>
                <div>
                    <ul>
                        <li>
                            <Link to ="/login">Login</Link>
                        </li>
                        <li>
                            <Link to ="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}