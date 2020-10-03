import React, {Component} from 'react';


export default class Main extends Component{
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
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
        }else {
            return(
                <h2> Main Component Works</h2>
            )
        }
        
        
        }
            
    
}