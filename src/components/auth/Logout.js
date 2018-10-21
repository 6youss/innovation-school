import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Lougout extends Component{
  
    render(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return (
            <Redirect to='/signin'/>
        )   
    }
}
export default Lougout;