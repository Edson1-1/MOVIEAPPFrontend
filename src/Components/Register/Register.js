import React, {Component} from 'react';
import Axios from 'axios';


export default class Register extends Component{

    constructor(props){
        super(props)

        this.state= {
            name: "",
            email: "",
            password: "",
            error : ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }

     onChangeName(e){
         this.setState({
             name: e.target.value
         });
     }
     onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            error: ''
        })
            const {history} = this.props;
                        const userRegister = {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password
                        }
                        console.log(userRegister);
                        Axios.post('http://localhost:5000/api/user/register', userRegister)
                            .then( res => {
                                history.push("/login");
                            })
                            .catch( err => {
                                const errorMsg = err.response.data;
                                console.log("error with register API : "+errorMsg);
                                this.setState({
                                    error: errorMsg
                                })
                            })
                        this.setState({
                            name: "",
                            email: "",
                            password: ""
                        });
    }




    render() {

        if(localStorage.getItem('auth-token') === '' || !localStorage.getItem('auth-token')){
        return(

            <div>
               <form onSubmit = {this.onSubmit}>
                   <h1>Register</h1>
                   <div>
                   <label for = "Username">Username</label>
                   <input type="text"
                   name = "Username"
                   placeholder = "Username"
                   value = {this.state.name}
                   onChange = {this.onChangeName}
                   required/>
                   </div>
                   <div>
                   <label for = "Email">Email</label>
                   <input type="email"
                   name = "Email"
                   placeholder = "email@example.com"
                   value = {this.state.email}
                   onChange = {this.onChangeEmail}
                   required/>
                   </div>
                   <div>
                   <label for = "Password">Password</label>
                   <input type="password"
                   name = "Password"
                   placeholder = "Password"
                   value = {this.state.password}
                   onChange = {this.onChangePassword}
                   required/>
                   </div>
                   <div>
                   <input type="submit"
                   value = "Register"
                   onChange = {this.onSubmit}
                   required/>
                   </div>
               </form>
               <div>
                   {this.state.error}
               </div>
            </div>
        )}
        else {
            return (
                <div>
                    <h2>User already Logged in</h2>
                    <h3>Cannot Register new User while logged in</h3>
                </div>
            )
        }
    }
}