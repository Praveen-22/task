import React, { Component } from 'react';
import { Link } from "react-router-dom";
class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <div className="navbarAdmin fontsaira">
                <h2 className="fontsaira" className="nopadding nomargin adminhead">Welcome, Admin</h2>
                <ul className="adminvaul">
                    <Link to='/add_employee' className="adminvalilink"><li className="adminvali">Add Employee</li></Link>
                    <Link to='/view_employee' className="adminvalilink"><li className="adminvali">View</li></Link>
                    <li className="adminvali">Logout</li>
                </ul>
            </div>
        );
    }
}
 
export default NavBar;