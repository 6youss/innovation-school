import React from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'

const StudentsList = ({students}) => {
    
    const StudentItem = ({studentId,firstName,lastName,picture})=>{
        return (
            <NavLink to={`/student/${studentId}`}>
            <li className="big">
                <div className="img"><img className ="StudentAvatar" src={`http://localhost:3001/uploads/${picture}`} alt={"Student Avatar"}></img></div>
                <div className="center"><p>{firstName} {lastName}</p></div>
                <div className="left"><p>Details</p></div>
            </li>
            </NavLink>
        )   
    }

    const list = students
        .map(student => 
            <StudentItem key={student.studentId} studentId={student.studentId} firstName={student.firstName} lastName={student.lastName} picture={student.picture}/>);

    return (
        (list.length>0)? list : <p>"Can't find any student..."</p>
    )
} 
export default StudentsList;