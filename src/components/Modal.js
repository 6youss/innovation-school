import React, { Component } from 'react';



class  Modal extends Component{

  componentDidMount(){
    document.body.style.overflow='hidden';
  }

  componentWillUnmount(){
    document.body.style.overflow='auto';
  }

  close(e){
    e.stopPropagation();
    if(e.target.id===this.props.modalId || e.target.className==='close-modal'){
      this.props.closeMe();
    }
  }

  render(){
    return (
      <div id={this.props.modalId} className="modal-container" onClick={this.close.bind(this)}>
        <div id={this.props.modalId+"-div"} onClick={this.close.bind(this)} className='close-modal' ><img id={this.props.modalId+"-img"} className='close-modal' alt="sds" width="40px" height="40px" src="../close.png"/></div>
        {this.props.children}
      </div>
    )  
  } 
}

export default Modal;