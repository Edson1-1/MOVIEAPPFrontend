import React, {Component} from 'react';
import bcrypt from 'bcryptjs';
import Axios from 'axios';


export default class Register extends Component{

    constructor(props){
        super(props)

        this.state= {
            name: "",
            email: "",
            password: ""
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

        bcrypt.genSalt(10)
            .then((salt) => {
                bcrypt.hash(this.state.password, salt)
                    .then((hash) => {
                        const hashedPassword = hash;
                        const userRegister = {
                            name: this.state.name,
                            email: this.state.email,
                            password: hashedPassword
                        }
                        console.log(userRegister);
                        Axios.post('http://localhost:5000/api/user/register', userRegister)
                            .then( res => {
                                console.log(res.data);
                            })
                            .catch( err => {
                                console.log("error with register API : "+err);
                            })
                        this.setState({
                            name: "",
                            email: "",
                            password: ""
                        });
                
                    })
                    .catch( err => {
                        console.log("error with hashing password: "+err);
                    })
                    
                })
                .catch(err => {
                    console.log("error with generating salt" + err);
                })
    }




    render() {

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
            </div>
        )
    }
}