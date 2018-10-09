import React, {Component} from 'react';



class Modal extends Component {

    close(e){
      if(e.target.id===this.props.modalId){
        this.props.closeMe();
      }
    }
    render(){
        return (
                <div id={this.props.modalId} className="modal-container" onClick={this.close.bind(this)}>
                    {this.props.children}
                </div>
        )   
    }

}

export default Modal;