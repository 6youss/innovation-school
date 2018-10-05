import React, {Component} from 'react';

import AddStudent from './AddStudent'
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'

class Student extends Component {
    
    initialStudents;
    state = {
        students : [],
        searchInput:"",
        newStudent:false,
        studentIndex:-1
    }
    
    componentDidMount(){
        this.getStudents();
    }

    getStudents(){
        fetch("http://localhost:3001/student")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            students : json.students,
            studentIndex:0
          });
          this.initialStudents=json.students;
        });

    }

    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    addStudent = (e)=>{
        if(e.target.className === 'modal-container' || e.target.className === 'addstudent')
            this.setState({
                newStudent: !this.state.newStudent    
            });
    }

    handleDetails(e){
        let studentIndex = this.state.students.findIndex(student=>student.studentId===e);
        this.setState({
            studentIndex
        });
    }

    handleClick=(e)=>{
        if(e.target.className === 'modal-container')
            this.setState({
                studentIndex:-1
            });
    }

    render(){
        const list = this.state.students
        .filter(student => this.state.searchInput === '' 
                || ( (student.firstName+" "+student.lastName).indexOf(this.state.searchInput) !== -1) );
        
        return (
            <div>
                { this.state.newStudent && 
                    <AddStudent 
                        updateStudents = {this.getStudents.bind(this)}
                        addStudent = {this.addStudent.bind(this)}
                    />
                }
                <div className="StudentsHeader">
                    <div className="StudentsHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Students</h1>
                        <p className='addstudent' onClick={this.addStudent}>Add</p>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className="search" 
                        onChange={this.onChangeHandler.bind(this)}
                    />
                </div>
                <ul className="list">
                    <StudentsList students={list} handleDetails={this.handleDetails.bind(this)}/>
                </ul>
                {
                    this.state.studentIndex>-1 && 
                    <StudentDetails 
                        student={this.state.students[this.state.studentIndex]}
                        handleClick={this.handleClick}
                    />
                }
                
            </div>
        );
    }

}
export default Student;