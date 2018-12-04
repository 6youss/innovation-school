import React from 'react';
import {NavLink} from 'react-router-dom'

const GroupsList = ({groups}) => {
    
    const GroupItem = ({groupId,level,moduleName})=>{
        return (
            <NavLink className='list-item' to={`/group/${groupId}`}>
                <div><p>{groupId}</p></div>
                <div><p>{moduleName}</p></div>
                <div><p>{level}</p></div>
            </NavLink>
        )
    }

    const list =<div className="list">
                {
                    groups.map(group => {
                        return <GroupItem 
                            key={group.groupId} 
                            groupId={group.groupId}
                            moduleName={group.moduleName}
                            level={group.level}
                        />
                    })
                }
                </div>;

    return (
        (groups.length>0)? list : <p>"Can't find any groups..."</p>
    )
} 
export default GroupsList;