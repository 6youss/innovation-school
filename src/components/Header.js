import React from 'react';
import {NavLink} from 'react-router-dom'
import checkAut from './HOC/checkAuth';
   
const Header = ()=>{

    if(!checkAut([0]).component) 
        return null;
    
    return (
        <nav className="navbar">
            <NavLink exact to="/">
            <div className="branding">
                <img src="../logo.png" alt="logo" style={{width:"100px",height:"auto"}}/>
            </div>
            </NavLink>
            <div className="navbar-right">
                <h3><NavLink exact activeClassName="selected" to="/">Home</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/student">Students</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/teacher">Teachers</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/group">Groups</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/module">Modules</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/room">Rooms</NavLink></h3>
                <h3><NavLink activeClassName="selected" to="/payment">Payments</NavLink></h3>
            </div>
        </nav>
    )   
}

export default Header;