import React , {Component} from 'react';
import Axios from 'axios';



export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        } 
        
        // Axios.post('http://localhost:5000/api/user/login', userLogin)
        //     .then(res =>{
        //         console.log(res.data);
        //     })
        //     .catch( err => {
        //         console.log("error is : " + err);
        //     })

        this.setState({
            email: '',
            password: '',
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
                    <h2>{this.state.Demail} </h2>
                    <h2>{this.state.Dpassword} </h2>
                </div>
            </div>
        )
        
    }

}