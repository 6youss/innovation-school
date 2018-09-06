import React, {Component} from 'react';
import './Student.css'

import AddStudent from './AddStudent'
import StudentsList from './StudentsList';

class Student extends Component {
    
    initialStudents;
    state = {students : [],
        searchInput:"",
        newStudent:true
    }
    
    
    componentDidMount(){
        this.getStudents();
    }

    getStudents(){
        fetch("http://localhost:3001/student")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            students : json.students
          });
          this.initialStudents=json.students;
        });
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
                || ( (student.firstName+" "+student.lastName).indexOf(this.state.searchInput) !== -1) );
        
        return (
            <div>
            <h1 onClick={this.addStudent} > Add Student </h1>
            { this.state.newStudent && <AddStudent updateStudents = {this.getStudents.bind(this)} />}
            <ul className="studentList">
                <div className="StudentsHeader">
                    <h1>Students</h1>                    
                    <input type="text" placeholder="Search.." className="Input" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <StudentsList students={list}/>
            </ul>
            </div>
        )

    }

}

export default Student;