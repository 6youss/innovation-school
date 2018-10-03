import React, {Component} from 'react';

import AddStudent from './AddStudent'
import StudentsList from './StudentsList';

class Student extends Component {
    
    initialStudents;
    state = {students : [],
        searchInput:"",
        newStudent:false
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
    
    addStudent = (e)=>{
        
        if(e.target.className === 'modal-container' || e.target.className === 'addstudent')
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
            
            { this.state.newStudent && 
                <AddStudent 
                    updateStudents = {this.getStudents.bind(this)}
                    addStudent = {this.addStudent.bind(this)}
                />
            }
            <ul className="studentList">
                <div className="StudentsHeader">
                    <div className="StudentsHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Students</h1>
                        <p className='addstudent' onClick={this.addStudent} >Add</p> 
                    </div>             
                    <input type="text" placeholder="Search.." className="search" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <StudentsList students={list}/>
            </ul>
            </div>
        )

    }

}

export default Student;