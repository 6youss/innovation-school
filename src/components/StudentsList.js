import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'


class StudentsList extends Component {

    state = {students : []}

    componentDidMount(){
        console.log("component did mount");
        fetch("http://localhost:3001/student")
        .then( res => res.json())
        .then(json=>{
          console.log(json.students);
          this.setState({
            students : json.students
          });
          
        });
    }


    Student = ({studentId,firstName,lastName,picture})=>{
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
    

    
    render(){

        return (
            <ul className="studentList">
                <h1>Students</h1>
                {this.state.students.map( student => 
                       <this.Student key={student.studentId} studentId={student.studentId} firstName={student.firstName} lastName={student.lastName} picture={student.picture}/>
                    )
                }
            </ul>
        )

    }

}

export default StudentsList;