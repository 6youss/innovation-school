import React from 'react';
import {NavLink} from 'react-router-dom'

   
const Header = ()=>{

    return (
        <nav className="navbar">
            <div className="branding">
                <img src="../logo.png" alt="logo" style={{width:"100px",height:"auto"}}/>
            </div>
            <div className="navbar-right">
                <h3> <NavLink to="/">Home</NavLink></h3>
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