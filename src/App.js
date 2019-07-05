import React, { Component } from 'react';
import Login from './components/login/Login';
import Home from './components/home/Home';
import store from 'store';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {

	constructor(props) {
		super(props)
        this.state = {
            isLoggedIn: false
        }
        // let isLoggedIn = false;
        // let check = store.get('loggedIn');
        
        if(store.get('loggedIn')){
        	this.setState({
                        isLoggedIn: store.get('loggedIn')
                });
        }
        
        // let isLoggedIn = check;
		// console.log("check",check);
		console.log("isLoggedIn state",this.state.isLoggedIn);
		console.log("isLoggedIn store",store.get('loggedIn'));
    }
	
	render() {
		
		return (
			<Router>
			<div className="App">
			<Route path="/" exact strict render={
				()=>(
					store.get('loggedIn') ? (<Redirect to="/home" />) : (<Login />)
					)
			} />
			
			<Route path="/home" strict  render={()=>(
					store.get('loggedIn') ? (<Home />) : (<Redirect to="/" />)
				)
			} />
			</div>
			</Router>
		);
	}
}

export default App;
