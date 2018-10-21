import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

import AddTeacher from './AddTeacher'
import TeachersList from './TeachersList';

class Teacher extends Component {
    
    
    state = {teachers : [],
        newTeacher:true
    }
    
    
    componentDidMount(){
        this.getTeachers();
    }

    getTeachers(){
        fetch("http://localhost:3001/teacher")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            teachers : json.teachers
          });
          
        });
    }
    
    AddTeacher = ()=>{
        this.setState({
            newTeacher: !this.state.newTeacher    
        });
    }
    
    render(){
        
        return (
            <div>
            { this.state.newTeacher && <AddTeacher updateTeachers = {this.getTeachers.bind(this)} />}
            <div>
                <div>
                    <h1>Teachers</h1>
                    <p onClick={this.AddTeacher} > Add teacher </p>
                </div>
                {
                    this.state.teachers.length>0 ? 
                        <TeachersList
                            teachers={this.state.teachers}
                        /> 
                    : 
                        <p>"Can't find any teacher..."</p>
                }
            </div>
            </div>
        )

    }

}

export default Teacher;