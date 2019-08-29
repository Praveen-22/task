import React, { Component } from 'react';
import axios from 'axios';
import history from './history';

class Homepage extends Component {
    state = { 
        username : '',
        password : '',
        showPassword : false
    }

    componentDidMount(){
        axios.get('/api/user/insertUser')
        .then(res=>{
            console.log(res);
        })
    }

    formSubmit = event =>{
        event.preventDefault();
        axios.post('/api/user/fetchUser',{
            username : this.state.username,
            password : this.state.password
        })
        .then(res=>{
            if(res.data.success === true){
                localStorage.setItem('token', res.data.token);
                history.push('/add_employee');
            }
            else{
                console.log("Enter Correct username and password")
            }
        })
    }

    textChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    showUserName = event =>{
        event.preventDefault();
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div className="loginScreen">
                    <div className="loginBox">
                        <form onSubmit={this.formSubmit}>
                            <input type="text" name="username" className="textlogin fontsaira" placeholder="User Name" onChange={this.textChange} />
                            <input type="password" name="password" className="textlogin fontsaira" placeholder="Password" onChange={this.textChange} />
                            <input type="submit" className="submitLogin fontsaira" />
                        </form>
                        <button onClick={this.showUserName} className="usernamebutton fontsaira">{this.state.showPassword===true ? "Click here to hide" : "Click here to see username and password"}</button>
                        <div className={this.state.showPassword===true ? "display" : "nodisplay"}>
                            <label className="fontsaira">Username : admin</label><br />
                            <label className="fontsaira">Password : password1234</label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Homepage;