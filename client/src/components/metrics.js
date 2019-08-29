import React, { Component } from 'react';
import Navbar from './navbar';
import { getJWT } from './jwt.js';
import axios from 'axios';
import {Link} from 'react-router-dom';

class addMetrics extends Component {
    state = {
        empDetails : [],
        punctuality : 0,
        execution : 0,
        learning : 0,
        teamCooperation : 0,
        responsibility : 0,
        metricsTrue: false
    }

    componentDidMount(){
        const JWT = getJWT();
        if(!JWT) {
            console.log("error");
            // history.push('/');
        }
        const data = {
          'empId': this.props.location.state.empId,
        }
        const headers = {
            Authorization : "Bearer "+JWT
        }
        axios.post('api/employee/fetchEmployeeEach',data,{
            headers: headers
        })
        .then(res=>{
            this.setState({
                empDetails : res.data.result[0]
            })
        })

        axios.post('api/metrics/findMetricsEach',data,{
            headers: headers
        })
        .then(res=>{
            console.log(res);
            if(res.data==="newone"){

            }
            else{
                this.setState({
                    punctuality :res.data.result[0].punctuality,
                    execution : res.data.result[0].execution,
                    learning : res.data.result[0].learning,
                    teamCooperation : res.data.result[0].teamCooperation,
                    responsibility : res.data.result[0].responsibility,
                    pdfLink : "pdffiles/"+res.data.result[0].pdfUrl,
                    metricsTrue : true
                })
            }
        })
    }
    metSumbit=event=>{
        event.preventDefault();
        const JWT = getJWT();
        if(!JWT) {
            console.log("error");
            // history.push('/');
        }
        const data = {
          'punctuality': this.state.punctuality,
          'execution': this.state.execution,
          'learning': this.state.learning,
          'teamCooperation': this.state.teamCooperation,
          'responsibility': this.state.responsibility,
          'empId': this.props.location.state.empId,
          'empMail' : this.state.empDetails.empMail,
          'empDOB' : this.state.empDetails.empDOB,
          'empPhone' : this.state.empDetails.empPhone,
          'empGender' : this.state.empDetails.empGender,
          'empRole' : this.state.empDetails.empRole,
          'empName' : this.state.empDetails.empName,
        }
        const headers = {
            Authorization : "Bearer "+JWT
        }
        axios.post('api/metrics/insertMetrics',data,{
            headers: headers
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.message==="sucess"){
                alert("Metrics Uploaded Sucessfully")
                this.setState({
                    punctuality :res.data.result[0].punctuality,
                    execution : res.data.result[0].execution,
                    learning : res.data.result[0].learning,
                    teamCooperation : res.data.result[0].teamCooperation,
                    responsibility : res.data.result[0].responsibility,
                    pdfLink : "pdffiles/"+res.data.result[0].pdfUrl,
                    metricsTrue : true
                })
            }
            else{
                alert("Something went wrong");
            }
        })

    }
    rangeChange=event=>{
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log(event.target.name +":"+ this.state[event.target.name])
    }  
      


    render() {
        return (
            <div>
                <Navbar />
                <div className="metBox">
                    <div className="container">
                        <label>Employee Personal Details</label>
                        <div className="row">
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee Name :</label><label className="empContentmet">{this.state.empDetails.empName}</label>
                            </div>
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee Email :</label><label className="empContentmet">{this.state.empDetails.empMail}</label>
                            </div>
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee DOB :</label><label className="empContentmet">{this.state.empDetails.empDOB}</label>
                            </div>
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee Phone :</label><label className="empContentmet">{this.state.empDetails.empPhone}</label>
                            </div>
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee Gender :</label><label className="empContentmet">{this.state.empDetails.empGender}</label>
                            </div>
                            <div className="col-md-6 empBox">
                                <label className="empHeadingsDet">Employee Role :</label><label className="empContentmet">{this.state.empDetails.empRole}</label>
                            </div>
                        </div>
                        <form onSubmit={this.metSumbit}>
                        <div className="addMetrics">
                            <label className="metHeading fontsaira">Employee Metrics</label>                            
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="metsubHeading fontsaira">Punctuality and Discipline</label>
                                        <div className="row">
                                            <div className="col-md-10 col-xs-10">
                                                <input type="range" className="slider" name="punctuality" value={this.state.punctuality} min="0" max="10" onChange={this.rangeChange} />
                                            </div>
                                            <div className="col-md-2 col-xs-2">
                                                <label className="metValue fontsaira">{this.state.punctuality}</label>
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-4">
                                        <label className="metsubHeading fontsaira">Execution of Duties</label>
                                        <div className="row">
                                            <div className="col-md-10 col-xs-10">
                                                <input type="range" className="slider" name="execution" value={this.state.execution} min="0" max="10" onChange={this.rangeChange} />
                                            </div>
                                            <div className="col-md-2 col-xs-2">
                                                <label className="metValue fontsaira">{this.state.execution}</label>
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-4">
                                        <label className="metsubHeading fontsaira">Learning and Development</label>
                                        <div className="row">
                                            <div className="col-md-10 col-xs-10">
                                                <input type="range" className="slider" name="learning" value={this.state.learning} min="0" max="10" onChange={this.rangeChange} />
                                            </div>
                                            <div className="col-md-2 col-xs-2">
                                                <label className="metValue fontsaira">{this.state.learning}</label>
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-4">
                                        <label className="metsubHeading fontsaira">Team Cooperation</label>
                                        <div className="row">
                                            <div className="col-md-10 col-xs-10">
                                                <input type="range" className="slider" name="teamCooperation" value={this.state.teamCooperation} min="0" max="10" onChange={this.rangeChange} />
                                            </div>
                                            <div className="col-md-2 col-xs-2">
                                                <label className="metValue fontsaira">{this.state.teamCooperation}</label>
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-4">
                                        <label className="metsubHeading fontsaira">Responsibility Taken </label>
                                        <div className="row">
                                            <div className="col-md-10 col-xs-10">
                                                <input type="range" className="slider" name="responsibility" value={this.state.responsibility} min="0" max="10" onChange={this.rangeChange} />
                                            </div>
                                            <div className="col-md-2 col-xs-2">
                                                <label className="metValue fontsaira">{this.state.responsibility}</label>
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-4">
                                        <div className="submitMetrics">
                                            <input type="submit" className="metSubmit" />
                                        </div>                                
                                    </div>
                                </div>
                            </div>                        
                        </form>
                        <div className={this.state.metricsTrue===true ? "row" : "nodisplay"}>
                            <div className="col-md-4">
                                <label className="metHeading fontsaira">View Metrics Details</label>
                                <Link to={this.state.pdfLink} target="_blank"><button className="downloadbutton fontsaira">View</button></Link>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default addMetrics;