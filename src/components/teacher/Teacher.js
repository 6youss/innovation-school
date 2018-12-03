import React, {Component} from 'react';

import AddTeacher from './AddTeacher'
import TeachersList from './TeachersList';


import TeacherDetails from './TeacherDetails'
import PrivateRoute from '../PrivateRoute'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
class Teacher extends Component {
    
    
    state = {teachers : [],
        newTeacher:false,
        searchInput:""
    }
    
    componentDidMount(){
        this.getTeachers();
    }

    getTeachers(){
        fetch("http://192.168.1.5:3001/teacher")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            teachers : json.teachers
          });
          
        });
    }
    
    addTeacher = ()=>{
        this.setState({
            newTeacher: !this.state.newTeacher    
        });
    }

    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    render(){
        const list = this.state.teachers
        .filter(teacher => this.state.searchInput === '' 
                || ( (teacher.firstName+" "+teacher.lastName).indexOf(this.state.searchInput) !== -1) );
        
        return (
            <div style={{width:'100%'}}>
                { this.state.newTeacher && 
                    <AddTeacher 
                        addTeacher = {this.addTeacher.bind(this)}
                        updateTeachers = {this.getTeachers.bind(this)}
                    />
                }
                <div  className="StudentsHeader">
                    <div className="StudentsHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Teachers</h1>
                        <p className='title-icon' onClick={this.addTeacher} > 
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
                <TeachersList
                        teachers={list}
                />
                <PrivateRoute rights={[0,1]} path={"/teacher/:id"} component = {TeacherDetails}/>
            </div>
        )

    }

}

export default Teacher;