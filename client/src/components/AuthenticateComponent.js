import React, { Component } from 'react';
import { getJWT } from './jwt.js';
// import history from './history';
import axios from 'axios';

class AuthenticatedComponent extends Component {
    state = {
        user : undefined
    }
    componentDidMount(){
        const JWT = getJWT();
        if(!JWT) {
            console.log("error");
            // history.push('/');
        }
        axios
        .get('api/user/checkAuthenticate',{
        headers: {
            "auth-token" : JWT
          }
        })
        .then(result=>{
            if(result.data==="success"){
                this.setState({
                    user: true
                })
            }
            else{
                this.setState({
                    user: undefined
                })
            }
        //     if(result.data==="sucess"){
        //         this.setState({
        //             user : "authorized"
        //         })
        //     }
        //     else if(result.data.msg==="token is not valid"){
        //         console.log("token is not valid");
        //         // localStorage.removeItem('token')
        //         // history.push('/');
        //     }
        //     else if(result.data.msg==="no token authrozied denied"){
        //         console.log("no token authrozied denied");
        //         // localStorage.removeItem('token')
        //         // history.push('/');
        //     }
        //     else{
        //         // history.push('/');
        //     }
        // })
        // .catch(err => {
        //             console.log(err);
        //     //         // localStorage.removeItem('token')
            })
        }

    render() {

        return(
            <div>
                 {this.state.user===undefined ? <h3>Loading</h3> : this.props.children}
            </div>
        )
    }
}
 
export default AuthenticatedComponent;