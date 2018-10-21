import React, {Component} from 'react';

const Loader = (propName)=>(WrappedComponent)=>{
  
  return class Loader extends Component{
    render(){
      return ( this.props[propName].length===0 ? 
        <p>Loading...</p>
       :
        <WrappedComponent {...this.props}/>
      )
    }
  } 
}

export default Loader;