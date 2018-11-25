import React from 'react';



const  Modal = (props)=> {

    function close(e){
      if(e.target.id===props.modalId || e.target.className==='close-modal'){
        props.closeMe();
      }
    }
    
    return (
            <div id={props.modalId} className="modal-container" onClick={close.bind(this)}>
              <div onClick={close.bind(this)} className='close-modal'><img className='close-modal' alt="sds" width="40px" height="40px" src="../close.png"/></div>
              {props.children}
            </div>
    )   
    

}

export default Modal;