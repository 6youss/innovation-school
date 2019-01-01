import React from 'react';
import {NavLink} from 'react-router-dom'

//import DropItems from '../DropItems'

const ModulesList = ({modules}) => {
    
    const ModuleItem = ({moduleId,moduleName,picture})=>{
        return (
            <NavLink to={`/module/${moduleId}`} className='list-item'>
                <img
                    className ="StudentAvatar"
                    src={picture?`http://192.168.1.5:3001/uploads/${picture}`:"../default-avatar.png"}
                    alt={"Student Avatar"}
                    onError={(e)=>{e.target.src="../default-avatar.png"}}
                />
                <div><p>{moduleName}</p></div>
            </NavLink>
        )
    }

    const list = modules
                .map(module =>
                    <ModuleItem 
                        key={module.moduleId} 
                        {...module}
                    />
                );
    return (
        <div className="list">
            {(list.length>0)? list : <p>"Can't find any module..."</p>}
        </div>
    )
}
export default ModulesList;