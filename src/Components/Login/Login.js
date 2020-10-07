import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

import {LogContext} from '../LogContextProvider'
import './Login.css'




export default class Login extends Component{
    static contextType = LogContext;

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            error: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }
    async onSubmit(e) {
        
        e.preventDefault();
        this.setState({
            err: '',
        });
        const {history} = this.props;
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        try{
            const data = await Axios.post(process.env.REACT_APP_BASE_URL+'user/login', userLogin);
            const token = data.data;
            localStorage.setItem('auth-token', token);
            this.setState({
                email: "",
                password: "",
            }); 
                this.context.loggedIn();
             history.push('/');
        }catch(err) {
            console.log("Error is"+ err);
            const error = err.response.data+'';
            console.log('error is: ', error);
            if(error === '"email" must be a valid email') {
                this.setState({
                    error: "Email must be a valid email"
                })
            }else if(error === '"password" length must be at least 6 characters long') { 
                this.setState({ error : "Password must be atleast 6 characters long" })
            }else if(error === 'Id or Password is wrong!'){
                this.setState({ error : "Id or Password in incorrect" })
            }
        }
        
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }

    render() {
        

        if(!localStorage.getItem('auth-token')){
        return (
            <div>
                <LogContext.Consumer>
                    {(context) => ( <React.Fragment>
                    <div className="login-container">
                        <form onSubmit={this.onSubmit} >
                        <h1 className = "title-h1">Login</h1>
                        <div className = "form-group">
                            <label for = "id">Email or Username *</label>
                            <input type = "text" 
                            className = "form-control"
                            name = "id" 
                            placeholder = "Email or Username" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                            required/>
                        </div>
                        <div className = "form-group">
                            <label for = "Password">Password *</label>
                            <input type = "password"
                            className = "form-control" 
                            name="Password" 
                            placeholder = "Password"
                            value = {this.state.password}
                            onChange = {this.onChangePassword}
                            required/>
                        </div>
                        <div className = "form-group">
                            <input className = "btn btn-primary" type = "submit" value="Login" onSubmit = {this.onSubmit} />
                        </div>
                        </form>
                        {/* <div>
                        </div> */}
                        <div>
                           <span className = "error-login">{this.state.error} </span>
                           <p class="signup-link">Don't have an account?  <Link className = "regLink" to = '/register'> Sign up here!</Link></p>
                        </div>
                    </div>
                </React.Fragment>
                )}
                </LogContext.Consumer>
            </div>
        )}
        else {
            return(
                
                <div className="jumbotron jumbotron-margin">
                    <h1 className="display-4">User already Logged In</h1>
                    <Link to = '/' className = "btn btn-outline-dark">Go Back to Home Page</Link>
                </div>
            )
        }
        
    }

}