import React , {Component} from 'react';
import Axios from 'axios';




export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
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
            const data = await Axios.post('http://localhost:5000/api/user/login', userLogin);
            const token = data.data;
            localStorage.setItem('auth-token', token);
            history.push('/');
        }catch(err) {
            const error = err.response.data;
            console.log('error is: ', error);
            this.setState({
                error: error+''
            });
        }

        this.setState({
            email: "",
            password: ""
        });
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
                
                <form onSubmit={this.onSubmit}>
                <h2>Login</h2>
                <div>
                    <label for = "Email">Email</label>
                    <input type = "email" 
                    name = "Email" 
                    placeholder = "email@example.com" 
                    value={this.state.email} 
                    onChange={this.onChangeEmail}
                    required/>
                    </div>
                    <div>
                    <label for = "Password">Password</label>
                    <input type = "password" name="Password" 
                    placeholder = "password"
                    value = {this.state.password}
                    onChange = {this.onChangePassword}
                    required/>
                    </div>
                    <input type = "submit" value="Login" onSubmit = {this.onSubmit}/>
                </form>
                <div>
                    <h2>{this.state.error} </h2>
                </div>
            </div>
        )}
        else {
            return(
                <h2>User already Logged in</h2>
            )
        }
        
    }

}