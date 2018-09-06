import React from 'react';

const Select = ({name,options,handleChange,error})=>{
    
    return (
     <div>
        <p>{name}</p>
        <select name={name.toLowerCase()} defaultValue={name} onChange={handleChange}>
            <option value={name} disabled>{`Select the ${name}...`}</option>
            {
                options.map( option =>
                    <option 
                        key={option.key} 
                        value={option.key}
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