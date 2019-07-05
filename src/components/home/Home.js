import React, { Component } from "react";
import axios from 'axios';
import store from 'store';
import { Redirect } from "react-router-dom";
import { Row,Col, Form, FormGroup, ControlLabel, Navbar, Nav, NavItem, Radio, Button } from 'react-bootstrap';
import './home.css';
import logo from "../../img/logo.png";
import userImg from "../../img/user.jpg";
// import Multiselect from "react-bootstrap-multiselect";
// import BarChart from 'react-bar-chart';
import Select from 'react-select';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Home extends Component {

    constructor(props) {
        super(props)
        const udata = store.get('userdata');
        // const cdata = [
        //                   {text: 'Jan', value: 5}, 
        //                   {text: 'Feb', value: 10},
        //                   {text: 'Mar', value: 4}, 
        //                   {text: 'Apr', value: 9}, 
        //                   {text: 'Jun', value: 7} 
        //                 ];
        this.state = {
            // isLoggedIn: true,
            username:udata.data.fullname,
            // selUser:null,
            myData : [
                        // {value:'Afghanistan',selected:true},
                        // {value:'Albania'},
                        // {value:'Algeria'},
                        // {value:'Andorra'},
                        // {value:'Angola'},
                        // {value:'Albania'},
                        // {value:'Algeria'},
                        // {value:'Andorra'},
                        // {value:'Bhutan'},
                        // {value:'Bolivia'},
                        // {value:'Brazil'},
                        // {value:'China'},
                        // {value:'Colombia'},
                        // {value:'Comoros'},
                        // {value:'India'},
                        // {value:'Indonesia'},
                        // {value:'Italy'},
                    ],
            selUserData:{}
            // chartData:cdata
        }
        
    }

    logOutHandler = (e) => {
        localStorage.clear();
        window.location.reload()
        return <Redirect push to='/' />
    }

    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    getAllUser = (event) => {
        event.preventDefault();

        //  let isLoggedIn;
         let formData1 = new FormData();
         let udata = store.get('userdata');
        formData1.append('userid', udata.data.id)

        axios({
            method: 'post',
            // url: 'http://localhost/rest/userdata.php',
            url: 'https://demo.aminfocraft.com/reactapi/userdata.php',
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
                        myData : response.data.data
                });
            }

        })
        .catch((response) => {
            console.log("--error",response)
        });
    }

    userDetail = (e) => {
        // this.setState({ selectedOption });
        // console.log(`Option selected:`, e.value);
        // console.log("change event--",e.target)
        // this.setState({selUser: e.value});
        let uData = {}
        this.state.myData.map(function(item, key){
                if(item.id === e.value){
                    // console.log("item.fullname",item.fullname);
                    uData = item
                }

                return uData;
            });

        console.log("uData",uData);
            this.setState({
                            selUserData : uData
                        });    
        }

    render() {

        const { username,myData, selUserData } = this.state;
        
        console.log("selUserData",selUserData);

        let newSelect = [];
        myData.map((e, key) => {
            if(parseInt(e.id) !== parseInt(store.get('userid'))){
                var temp = {value:e.id,label:e.fullname}
                newSelect.push(temp);
            }
            return newSelect;
        })

        console.log("userid----",store.get('userid'));
        if(Object.getOwnPropertyNames(selUserData).length >= 1){
            // ------------- normal graph --------
                const data1 = [];
                const myUser = selUserData.graph;
                console.log("graph data",myUser);
                console.log("selected user data",selUserData);
                myUser.map((e, key) => {
                    var temp = {label:e.text,y:parseInt(e.value)}
                    data1.push(temp);
                    return data1;
                })
                console.log("djfkdjfkjdkjfk----",data1);

                // ------------- ./graph ------------

                // ----------canvas -----------------

                const options = {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                        text: ""
                    },
                    axisX: {
                        title: "Months",
                        reversed: false,
                    },
                    axisY: {
                        title: "Count",
                        labelFormatter: this.addSymbols
                    },
                    data: [{
                        type: "column",
                        dataPoints: data1
                    }]
                }

                console.log("uuuuuu----",options);
        ///--------------------------------
        // ----------./canvas ---------------

        return (
            <div className="Home" onLoad={this.getAllUser}>
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="#home">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  /> {' React-Bootstrap'}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem href="">Home</NavItem>
                        <NavItem href="">About Us</NavItem>
                        <NavItem href="">Setting</NavItem>
                        <NavItem href="#" onClick={this.logOutHandler}>Logout</NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <Row className="show-grid">
                <h1 className="center">Welcome to {username}</h1>
                <Col xs={4} md={4}></Col>
                <Col xs={4} md={4}>
                <Form>
                  <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select User</ControlLabel>
                    <Select options={newSelect} onChange={this.userDetail.bind(
                        this)} />
                </FormGroup>
                </Form>
                </Col>
                </Row>
                <Row>
                <Col xs={12} md={2}></Col>
                <Col xs={12} md={4}>
                <div className="center">

                    <Col xs={12} md={12} className="hr">
                    <Col xs={12} md={12} className="pd-5">
                    <ControlLabel>
                        {selUserData.fullname}
                    </ControlLabel>
                    </Col>
                    <Col xs={2} md={4}>
                        <img
                            src={userImg}
                            width="85"
                            height="85"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                          />
                    </Col>
                    <Col xs={10} md={8} className="gender">
                        <FormGroup>
                          <Radio name="gender" checked={selUserData.gender === 'male'}  inline>
                            Male
                          </Radio>{' '}
                          <Radio name="gender" checked={selUserData.gender === 'female'} inline>
                            Female
                          </Radio>{' '}
                          
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={12} className="pd-5">
                    <ControlLabel>
                       Signed Up On {selUserData.createtime}
                    </ControlLabel>
                    </Col>
                    </Col>
                    <Col xs={12} md={12} className="hr">
                        <ControlLabel className="pd-5">
                            {selUserData.fullname } has connected 35 times
                        </ControlLabel>
                        <br/>
                        <p>
                            {selUserData.email}
                        </p>
                        <p>
                            {selUserData.mobile}
                        </p>
                        <Button className="mb-15 pull-left" bsStyle="primary">Update</Button>
                        <Button className="mb-15 pull-right" bsStyle="danger">Delete User</Button>
                    </Col>
                    <Col xs={12} md={12} className="hr">
                        
                    </Col>
                    </div>
                    
                </Col>
                <Col xs={12} md={4} className="hr">
                      <CanvasJSChart options = {options} />
                    </Col>
                </Row>
                    </div>
                        )
        }else{
            return (
            <div className="Home" onLoad={this.getAllUser}>
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="#home">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  /> {' React-Bootstrap'}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem href="">Home</NavItem>
                        <NavItem href="">About Us</NavItem>
                        <NavItem href="">Setting</NavItem>
                        <NavItem href="#" onClick={this.logOutHandler}>Logout</NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <Row className="show-grid">
                <h1 className="center">Welcome to {username}</h1>
                <Col xs={4} md={4}></Col>
                <Col xs={4} md={4}>
                <Form>
                  <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select User</ControlLabel>
                    <Select options={newSelect} onChange={this.userDetail.bind(
                        this)} />
                </FormGroup>
                </Form>
                </Col>
                </Row>
                </div>
            )
        }
        
        }
        
    }

export default Home;