import React, {Component} from 'react';
import Axios from 'axios';
import jwt from 'jsonwebtoken';

import Card from '../Card/CardComponent';
import './Main.css'

export default class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            info: [],
            user : ""

        };

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        
        try{
        const token = localStorage.getItem('auth-token');
        const user = jwt.verify(token, 'secretKey1234');
        this.setState({
            user: user
        });

        }catch(err){
            console.log("error is:"+err);

        }

        

        Axios.get('http://localhost:5000/api/movie/')
            .then( data => {
                // console.log(data.data);
                this.setState({
                    info: data.data
                });
            })
            .catch( err => {
                console.log(err.response.data);
            })
        }


    onClick(e){
        const {history} = this.props;
        history.push('/login');
    }


    render(){
        if(!localStorage.getItem('auth-token')){
        return (
            <div>
                <h1> You are not Logged in</h1>
                <button onClick = {this.onClick}>Login</button>
                </div>
            )
        }else if(this.state.user !== '') {
            return(
                <div>
                    <h1>MOVIE APP</h1>
                    <Card info = {this.state.info}/>
                    
                </div>
            )
        }
        else {
            return(
                <h4> You are not authorized to access this page. Please login with valid id or Register a new account. </h4>
            )
        }
        
        
        }
            
    
}