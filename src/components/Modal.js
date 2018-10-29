import React from 'react';



const  Modal = (props)=> {

    function close(e){
      if(e.target.id===props.modalId){
        props.closeMe();
      }
    }
    
    return (
            <div id={props.modalId} className="modal-container" onClick={close.bind(this)}>
                {props.children}
            </div>
    )   
    

}

export default Modal;