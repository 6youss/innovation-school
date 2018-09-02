import React from 'react';
import './AddStudent.css'

const Input = ({name,label,type,placeholder,handlechange,error})=>{
        
    return (
        <div className="PersoInput">
            <p>{label}</p>
            <input name={name} type={type} placeholder={placeholder} 
                onChange={handlechange}/>
            <p>{error}</p>
        </div>
     )
}

export default Input;