import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'

import AddStudent from './AddStudent'



class StudentsList extends Component {

    state = {students : [],
        searchInput:"",
        newStudent:true
    }
    initialStudents;
    
    componentDidMount(){

        fetch("http://localhost:3001/student")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            students : json.students
          });
          this.initialStudents=json.students;
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
    
    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    addStudent = ()=>{
        this.setState({
            newStudent: !this.state.newStudent    
        });
    }
    
    render(){

        const list = this.state.students
        .filter(student => this.state.searchInput === '' 
                || ( (student.firstName+" "+student.lastName).indexOf(this.state.searchInput) !== -1) )
        .map(student => 
            <this.Student key={student.studentId} studentId={student.studentId} firstName={student.firstName} lastName={student.lastName} picture={student.picture}/>);

        return (
            <div>
            { this.state.newStudent && <AddStudent/>}
            <ul className="studentList">
                <div className="StudentsHeader">
                    <h1>Students</h1>
                    <p onClick={this.addStudent} > Add Student </p>
                    <input type="text" placeholder="Search.." className="Input" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                {
                    (list.length>0)? list : "No student with this name was found..."
                }
            </ul>
            </div>
        )

    }

}

export default StudentsList;