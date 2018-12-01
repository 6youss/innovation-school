import React from 'react';

const Select = ({label,name,options,handleChange,error,className})=>{
    
    return (
     <div className={className}>
        <p  style={{margin:'0 0 3px 0'}}>{label}</p>
        <select name={name} defaultValue={name} onChange={handleChange}>
            <option value={name} disabled>{label?label:name}</option>
            {
                options.map( option =>
                    <option 
                        key={option.key}
                        data-key={option.key}
                        value={option.value}
                    >
                        {option.value}
                    </option>
                )
            }
        </select>
        <p className='error'>{error}</p>
        </div>
    )
}

export default Select;