import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Input = ({name,label,type,placeholder,handlechange,error,init})=>{
    const err = error?' error-style':'';
    return (
        <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize:'13px'
                    }}>
            { label &&
                <p style={{margin:'0 0 3px 0'}}>{label}</p>
            }
            <div className='input-container'>
                {error &&
                    <span className={'input-icon'}>
                        <FontAwesomeIcon icon='times' style={{color:'var(--delete-color)'}}/>
                    </span>
                }
                <input 
                    className={'perso-input-text'+err} 
                    name={name} 
                    type={type} 
                    placeholder={placeholder} 
                    onChange={handlechange}
                    defaultValue={init}
                />
            </div>
        </div>
     )
}

export default Input;