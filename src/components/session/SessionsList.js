import React from 'react';
import {NavLink} from 'react-router-dom'

const SessionsList = ({sessions}) => {
    
    const SessionItem = ({sessionId,roomId,sessionDate,sessionDone})=>{
        return (
            <NavLink to={`/session/${sessionId}`}>
            <li className="big">
                <div className="img"><p>{"Room "+roomId}</p></div>
                <div className="center"><p>{sessionDate}</p></div>
                <div className="left"><p>{sessionDone?"Done":"Not done"}</p></div>
            </li>
            </NavLink>
        )
    }

    const list = sessions
                .map(session =>
                    <SessionItem 
                        key={session.sessionId} 
                        sessionId={session.sessionId}
                        roomId={session.roomId} 
                        sessionDate={session.sessionDate} 
                        sessionDone={session.sessionDone}
                    />
                );
    return (
        <ul>
            {(list.length>0)? list : <p>"Can't find any session..."</p>}
        </ul>
    )
} 
export default SessionsList;