import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Lougout extends Component{
  
    render(){
        localStorage.removeItem('token');
        return (
            <Redirect to='/signin'/>
        )   
    }
}
export default Lougout;