import React from 'react';
import {NavLink} from 'react-router-dom'
import checkAut from './HOC/checkAuth';
   
const Header = ()=>{

    

    if(!checkAut()) return null;
    
    return (
        <nav className="navbar">
            <div className="branding">
                <img src="../logo.png" alt="logo" style={{width:"100px",height:"auto"}}/>
            </div>
            <div className="navbar-right">
                <h3> <NavLink to="/home">Home</NavLink></h3>
                <h3><NavLink to="/student">Students</NavLink></h3>
                <h3><NavLink to="/teacher">Teachers</NavLink></h3>
                <h3><NavLink to="/group">Groups</NavLink></h3>
                <h3><NavLink to="/module">Modules</NavLink></h3>
                <h3><NavLink to="/room">Rooms</NavLink></h3>
                <h3><NavLink to="/payment">Payments</NavLink></h3>
            </div>
        </nav>
    )   
}

export default Header;