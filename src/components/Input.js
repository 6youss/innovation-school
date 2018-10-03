import React from 'react';

const Input = ({name,label,type,placeholder,handlechange,error})=>{
        
    return (
        <div className="PersoInput">
            <div style={{
                          padding:'0 0 0 3%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                <p style={{margin:'0 0 3px 0'}}>{label}</p>
                <input name={name} type={type} placeholder={placeholder} 
                    onChange={handlechange}/>
                {error &&
                    <p className='error'>{error}</p>
                }
            </div>
        </div>
     )
}

export default Input;