import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { getJWT } from './jwt.js';
import history from './history';

class Dashboard extends Component {
    state = {
        empName : '',
        empgender : '',
        empEmail : '',
        empPhone : '',
        empDOB : '',
        empRole : '0',
        maxDate : ''
    }

    componentDidMount(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //As January is 0.
            var yyyy = today.getFullYear();

            if(dd<10) dd='0'+dd;
            if(mm<10) mm='0'+mm;
            var todayDate = yyyy+"-"+mm+"-"+dd;
            this.setState({
                maxDate : todayDate
            })
        }
    inputChange=e=>{
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        });
    }
    formSumbit=event=>{
        const JWT = getJWT();
        if(!JWT) {
            console.log("error");
            // history.push('/');
        }
        event.preventDefault();
        const empName = this.state.empName;
        const empgender = this.state.empgender;
        const empEmail = this.state.empEmail;
        const empPhone = this.state.empPhone;
        const empDOB = this.state.empDOB;
        const empRole = this.state.empRole;
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const phonereg = /^([0-9]{10})$/;

        var empYear = empDOB.slice(0, 4);
        var currentYear = this.state.maxDate.slice(0, 4);

        var empAge = currentYear-empYear;

        // const headers = {
        //     // "auth-token" : JWT
        //     Authorization : "Bearer "+JWT
        // }
        const data = {
          'empName': this.state.empName,
          'empgender': this.state.empgender,
          'empEmail': this.state.empEmail,
          'empPhone': this.state.empPhone,
          'empRole': this.state.empRole,
          'empDOB': this.state.empDOB,
        }

        if(empName===''||empgender===''||empEmail===''||empPhone===''||empDOB===''||empRole===''){
            alert('Please fill all the fields')
        }
        else if(reg.test(empEmail) === false){
            alert("Enter Correct Mail Address");
        }
        else if(phonereg.test(empPhone) === false){
            alert("Enter Correct Phone Number");
        }
        else if(empAge<18){
            alert("Employee Age Should Be Greater Than 18")
        }
        else if(empRole===0){
            alert("Select Employee Role");
        }
        else{
            const headers = {
                Authorization : "Bearer "+JWT
            }
            axios.post('api/employee/insertEmployee', data, {
                headers: headers
            })
            .then(res=>{
                if(res.data.message===true){
                    alert("Employee Details Inserted Sucessfully...!")
                    history.push('/view_employee');
                }
            })
        }
    }
    render() { 
        return (
            <div>
                <Navbar />
                <div className="newUser">
                    <form onSubmit={this.formSumbit}>
                        <div className="newuserPlace">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="fontsaira empformheading">Employee Name</label><br />
                                    <input type="text" placeholder="Employee Name" name="empName" value={this.state.empName} onChange={this.inputChange} className="empformtext fontsaira" />
                                </div>
                                <div className="col-md-6">
                                    <label className="fontsaira empformheading">Employee Gender</label><br />
                                    <div className="radiobuttons">
                                        <fieldset>                                    
                                            <input type="radio" name="empgender" onChange={this.inputChange} value="male" /><label className="fontsaira radiolables" >Male</label>                            
                                            <input type="radio" name="empgender" onChange={this.inputChange} value="female" /><label className="fontsaira radiolables">Female</label>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="fontsaira empformheading">Employee E-mail</label><br />                         
                                    <input type="text" placeholder="Employee E-mail" name="empEmail" value={this.state.empEmail} onChange={this.inputChange} className="empformtext fontsaira" />
                                </div>
                                <div className="col-md-6">
                                    <label className="fontsaira empformheading">Employee Phone</label><br />  
                                    <input type="text" placeholder="Employee Phone" name="empPhone" value={this.state.empPhone} onChange={this.inputChange} className="empformtext fontsaira" />
                                </div>
                                <div className="col-md-6">
                                    <label className="fontsaira empformheading">Employee DOB</label><br />  
                                    <input type="date" className="empformtext fontsaira" id="datePicker" name="empDOB" max={this.state.empDOB} min="1960-01-01" onChange={this.inputChange} />
                                </div>
                                <div  className="col-md-6">
                                    <label className="fontsaira empformheading">Employee Role</label><br />  
                                    <select className="fontsaira selection" name="empRole" onChange={this.inputChange}>
                                        <option value="0" className="fontsaira"  >Choose Employee Role</option>
                                        <option value="Web Developer" className="fontsaira">Web Developer</option>
                                        <option value="Android Developer" className="fontsaira">Android Developer</option>
                                        <option value="Digital Marketer" className="fontsaira">Digital Marketer</option>
                                        <option value="Content Writter" className="fontsaira">Content Writter</option>
                                        <option value="Human Resource" className="fontsaira">Human Resource</option>
                                    </select>
                                </div>
                                <div  className="col-md-12">
                                    <input type="submit" className="fontsaira submitButtonemp" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Dashboard;