import React from 'react';

const Input = ({name,label,type,placeholder,handlechange,error})=>{
    
    return (
            <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize:'13px'
                        }}>
                { label &&
                    <p style={{margin:'0 0 3px 0'}}>{label}</p>
                }
                <input className='perso-input-text' name={name} type={type} placeholder={placeholder} 
                    onChange={handlechange}/>
                {error &&
                    <p className='error'>{error}</p>
                }
            </div>
        
     )
}

export default Input;