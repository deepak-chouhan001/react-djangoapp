import React, { Component } from "react";
import axios from 'axios';
import store from 'store';
import { Redirect } from "react-router-dom";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            // errors: {}, // Contains login field errors
            // formSubmitted: false, // Indicates submit status of login form 
            loading: false, // Indicates in progress state of login form
            items: {uername:'rakesh13',
                         password:'rakesh'},
            email:'',
            password:'',
            isLoggedIn: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name; 

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData,
            [event.target.name]:event.target.value
        });
    }

    loginnew = (e) => {
        e.preventDefault();

        // let isLoggedIn;
        let formData1 = new FormData();
        formData1.append('email', this.state.email)
        formData1.append('password', this.state.password)

        axios({
            method: 'post',
            // url: 'http://localhost/rest/login.php',
            url: 'https://demo.aminfocraft.com/reactapi/login.php',
            // url: 'http://localhost:8000/api-token-auth/',
            data: formData1,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then( (response)=> {
            //handle success
            console.log("--new",response);
            console.log("--success",response.data.success);
            if(response.data.success === 'true' || response.data.success === true)
            {

                this.setState({
                        isLoggedIn: true
                });
                store.set('loggedIn', true);
                store.set('userdata',response.data);
                store.set('userid',response.data.data.id);
                alert("You are successfully signed in...");
                setTimeout(() => {
                     window.location.reload();
                }, 2000);
            }else{
                alert(response.data.msg);
            }

        })
        .catch((response) => {
            //handle error
            console.log("--error",response)
        });

    }


    render() {
        // const isLoggedIn = this.state.isLoggedI
        const {isLoggedIn,email,password } = this.state;
        
        if(this.state.isLoggedIn === true){
            return (<Redirect to="/home" />);
        }else{
           

            return (
                <div className="Login">
                    <Row>
                    <h1>Login {isLoggedIn} </h1>
                        <Form onSubmit={this.loginnew}>
                            <FormGroup controlId="email">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl type="text" name="email" value={email} placeholder="Enter your email" onChange={this.handleInputChange} required />
                            </FormGroup >
                            <FormGroup controlId="password">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl type="password" value={password} name="password" placeholder="Enter your password" onChange={this.handleInputChange} required  />
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" block>Sign-In</Button>
                            <Button block>Register</Button>
                            <Button bsStyle="link" className="pull-right">Forgot Password</Button>
                        </Form>
                    </Row>
                </div>
            )
        }
        
    }
}

export default Login;