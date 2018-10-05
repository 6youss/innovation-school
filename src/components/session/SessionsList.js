import React from 'react';
import {NavLink} from 'react-router-dom'

const SessionsList = ({sessions}) => {
    
    const SessionItem = ({sessionId,moduleName,roomId,sessionDate,sessionDone})=>{
        return (
            <NavLink to={`/session/${sessionId}`} className='list-item'>
                <div><p>{moduleName}</p></div>
                <div><p>{"Room "+roomId}</p></div>
                <div><p>{sessionDate}</p></div>
            </NavLink>
        )
    }

    const list = sessions
                .map(session =>
                    <SessionItem 
                        key={session.sessionId} 
                        sessionId={session.sessionId}
                        moduleName={session.moduleName}
                        roomId={session.roomId} 
                        sessionDate={session.sessionDate} 
                        sessionDone={session.sessionDone}
                    />
                );
    return (
        <div className="list">
            {(list.length>0)? list : <p>"Can't find any session..."</p>}
        </div>
    )
} 
export default SessionsList;