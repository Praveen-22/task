import React, { Component } from 'react';
import Navbar from './navbar';
import { getJWT } from './jwt.js';
import axios from 'axios';
import {Link} from 'react-router-dom'

class ViewEmployee extends Component {
    state = {
        empDetails : []
    }

    componentDidMount(){
        const JWT = getJWT();
        if(!JWT) {
            console.log("error");
            // history.push('/');
        }
        const headers = {
            Authorization : "Bearer "+JWT
        }
        axios.get('api/employee/fetchEmployee',{
            headers: headers
        })
        .then(res=>{
            console.log(res);
            this.setState({
                empDetails : res.data.result
            })
        })
    }
    render() { 
        return (
            <div>
                <Navbar />
                <div className="viewBox fontsaira">
                    <div className="container">
                        <div className="empHeading textcenter">
                            <div className="row">
                                <div className="col-md-4 col-xs-4">
                                    <label className="empHeading">Employee Name</label>
                                </div>
                                <div className="col-md-4 col-xs-4">
                                    <label className="empHeading">Employee Role</label>
                                </div>
                                <div className="col-md-4 col-xs-4">
                                    <label className="empHeading">Metrics</label>
                                </div>
                            </div>
                        </div>
                        {this.state.empDetails.map((empdetails)=>
                            <div className="empContents textcenter" key={empdetails._id}>
                                <div className="row">
                                    <div className="col-md-4 col-xs-4">
                                        <label className="empContent">{empdetails.empName}</label>
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        <label className="empContent">{empdetails.empRole}</label>
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        <Link to={{pathname: '/addMetrics',state: {empId: empdetails._id}}} className="linkButton"><button className="AddButton">Add Metrics</button></Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ViewEmployee;