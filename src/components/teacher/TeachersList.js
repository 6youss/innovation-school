import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

class TeachersList extends Component {
    
    state = {
        
    }
    
   
    
    Teacher = ({teacherId,firstName,lastName,picture})=>{
        return (
            <NavLink to={`/teacher/${teacherId}`} className="student-item-container">
            <li className="student-list-item justify-center">
                <img 
                    className ="StudentAvatar"
                    src={picture?`http://localhost:3001/uploads/${picture}`:"../default-avatar.png"}
                    alt={"Teacher Avatar"}
                    onError={(e)=>{e.target.src="../default-avatar.png"}}
                >
                </img>
                <div className="center"><p>{firstName} {lastName}</p></div>
            </li>
            </NavLink>
        )   
    }
    
    render(){
        const list = this.props.teachers
        .map(teacher => 
            <this.Teacher 
                key={teacher.teacherId}
                {...teacher}
            />
        );
        return (
            <div>
            <div className="list">
                {
                    (list.length>0)? list : <p>"Can't find any teacher..."</p>
                }
            </div>
            </div>
        )

    }

}

export default TeachersList;