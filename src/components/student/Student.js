import React, {Component} from 'react';

import AddStudent from './AddStudent'
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'

import PrivateRoute from '../PrivateRoute'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Student extends Component {
    
    initialStudents;
    
    state = {
        students : [],
        searchInput:"",
        newStudent:false,
    }
    
    componentDidMount(){
        this.getStudents();
    }

    componentWillReceiveProps(){
        if(this.props.history.action ==="POP"){
            this.getStudents();
        }
    }

    getStudents(){
        fetch("http://192.168.1.5:3001/student")
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

    handleDetails(e){
        let studentIndex = this.state.students.findIndex(student=>student.studentId===e);
        this.setState({
            studentIndex
        });
    }

    render(){
        console.log(this.props);
        const list = this.state.students
        .filter(student => this.state.searchInput === '' 
                || ( (student.firstName+" "+student.lastName).indexOf(this.state.searchInput) !== -1) );
        
        return (
            <div style={{width:'100%'}}>
            
                { this.state.newStudent && 
                    <AddStudent 
                        updateStudents = {this.getStudents.bind(this)}
                        addStudent = {this.addStudent.bind(this)}
                    />
                }
                <div className="StudentsHeader">
                    <div className="StudentsHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Students</h1>
                        <p className='title-icon' onClick={this.addStudent}>
                            <FontAwesomeIcon icon='user-plus'/>
                        </p>
                    </div>
                    <input 
                        className="search" 
                        type="text" 
                        placeholder="Search.." 
                        onChange={this.onChangeHandler.bind(this)}
                    />
                </div>
                <ul className="list">
                    <StudentsList students={list} handleDetails={this.handleDetails.bind(this)}/>
                </ul>
                <PrivateRoute rights={[0,1]} path={"/student/:id"} component = {StudentDetails}/>
            </div>
        );
    }

}
export default Student;