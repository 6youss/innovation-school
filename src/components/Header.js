import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import checkAut from './HOC/checkAuth';
   
class Header extends Component{
    state={
        mobileSize:false
    }

    componentDidMount(){
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        let innerWidth = (window.innerWidth <= 760);
        if (innerWidth !== this.state.mobileSize) {
            this.setState({mobileSize: innerWidth });
        }
    }
    render(){
        if(!checkAut([0]).component) 
            return null;
    
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <NavLink exact to="/" className='navbar-item' style={{opacity:1}}>
                        <div 
                            onMouseEnter={(e)=>{ e.stopPropagation(); this.logo.src="../logo.png" }} 
                            onMouseLeave={(e)=>{ e.stopPropagation(); this.logo.src="../logo.svg" }} 
                            className="branding"
                        >  
                            <img ref={ref=>this.logo=ref} src="../logo.svg" alt="logo" style={{width:"80px",height:"auto"}}/>
                            <p><strong>INNOVATION SHOOL</strong></p>
                        </div>
                    </NavLink>
                    {this.state.mobileSize &&
                        <button>Mobile</button>
                    }
                </div>
                <div className="navbar-right">
                    <NavLink className='navbar-item' activeClassName="active" to="/student">Students</NavLink>
                    <NavLink className='navbar-item' activeClassName="active" to="/teacher">Teachers</NavLink>
                    <NavLink className='navbar-item' activeClassName="active" to="/group">Groups</NavLink>
                    <NavLink className='navbar-item' activeClassName="active" to="/module">Modules</NavLink>
                <NavLink className='navbar-item' activeClassName="active" to="/room">Rooms</NavLink>
                    <NavLink className='navbar-item' activeClassName="active" to="/payment">Payments</NavLink>
                </div>
            </nav>
        )  
    }
}

export default Header;