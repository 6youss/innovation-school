import React from 'react';
import {NavLink} from 'react-router-dom'

const GroupsList = ({groups}) => {
    
    const GroupItem = ({groupId,moduleId,level})=>{
        return (
            <NavLink to={`/group/${groupId}`}>
            <li className="big">
                <div className="img">{groupId}</div>
                <div className="center"><p>{moduleId}</p></div>
                <div className="left"><p>{level}</p></div>
            </li>
            </NavLink>
        )
    }

    const list = groups
                .map(group => {
                    return <GroupItem 
                        key={group.groupId} 
                        groupId={group.groupId}
                        moduleId={group.moduleId}
                        level={group.level}
                    />
                });

    return (
        (list.length>0)? list : <p>"Can't find any groups..."</p>
    )
} 
export default GroupsList;