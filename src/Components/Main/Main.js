import React, {Component} from 'react';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';
import Card from '../Card/CardComponent';
import './Main.css'
import Loader from '../Loader/Loader';


function NoData(){

    return(
        <div className="jumbotron jumbotron-margin">
                    <div>
                        <svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-folder-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"/>
                            <path fill-rule="evenodd" d="M11.146 10.146a.5.5 0 0 1 .708 0L13 11.293l1.146-1.147a.5.5 0 0 1 .708.708L13.707 12l1.147 1.146a.5.5 0 0 1-.708.708L13 12.707l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 12l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <h1 className="display-4">Hello, Welcome to MovieBase</h1>
                    <p className="lead">There are no movies in your account as of now.</p>
                    <hr className="my-4"/>
                    <Link to = '/movie/add' className="btn btn-primary button-size"  role="button">Add Movie</Link>
                </div>

    )
}

export default class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            info: [],
            user : "",
            log: 0,
            view: -1,
            showLoader: false

        };
        this.onClickLogout = this.onClickLogout.bind(this);
    }


    componentDidMount(){
        
        try{
        const token = localStorage.getItem('auth-token');
        const user = jwt.verify(token, process.env.REACT_APP_SECRET);
        this.setState({
            user: user
        });


        }catch(err){
            this.setState({
                user: '',
                log: 1
            })

        }
        let config = {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
            }}

            this.setState({
                showLoader: true
            })
        Axios.get(process.env.REACT_APP_BASE_URL+"movie/", config)
            .then( data => {
                // console.log(data.data.length);
                this.setState({
                    info: data.data,
                    view: data.data.length,
                    showLoader: false
                });
            })
            .catch( err => {
                this.setState({
                    view : 0,
                    showLoader: false
                })
                console.log(err.response.data);
            })
            
    }

    

    onClickLogout(e){
        if(localStorage.getItem('auth-token')){
        localStorage.removeItem('auth-token')
        this.setState({
            log :0
        })}
        
    }

    render(){
        if(!localStorage.getItem('auth-token')){ 
                
            this.props.history.push('/login')
                return(
                    <div></div>
                )
        }else if(this.state.user !== '') {
            if(this.state.showLoader === false){
                if(this.state.view !== 0){
                return(
                
                    <div>
                        <div className = "movie-List-addMovie">
                        <h2> Movie List</h2>
                            <Link className="btn btn-outline-success btn-sm" to = '/movie/add' role="button">Add Movie</Link>
                        </div>
                        <Card info = {this.state.info} className = "grid"/>
                    </div>

                    
                )
                }else if(this.state.view === 0){
                    return(
                        <NoData/>
                    )
                }else return(<div></div>)
            }else {
                return( 
                    <Loader/>
                )
            }
        }
        else {
            return(
                <div className="jumbotron jumbotron-margin">
                <h1 className="display-4">Something went horribly wrong!</h1>
                <p>Please Logout and try again</p>
                    <Link to = '/' className = "btn btn-outline-warning" onClick = {this.onClickLogout}>Logout</Link>

                </div>
            )
        }
        
        
        }
            
    
}