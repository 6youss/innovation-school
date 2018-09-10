import React from 'react';

const Select = ({label,name,options,handleChange,error})=>{
    
    return (
     <div>
        <p>{label}</p>
        <select name={name} defaultValue={name} onChange={handleChange}>
            <option value={name} disabled>{label?label:name}</option>
            {
                options.map( option =>
                    <option 
                        key={option.key}
                        value={option.value}
                    >
                        {option.value}
                    </option>
                )
            }
        </select>
        <p>{error}</p>
        </div>
    )
}

export default Select;