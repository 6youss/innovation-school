import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Teacher.css'

import AddTeacher from './AddTeacher'



class TeachersList extends Component {
    
    initialTeachers;
    state = {teachers : [],
        searchInput:"",
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
          this.initialTeachers=json.teachers;
        });
    }


    
    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    AddTeacher = ()=>{
        this.setState({
            newTeacher: !this.state.newTeacher    
        });
    }

    Teacher = ({teacherId,firstName,lastName,picture})=>{
        return (
            <NavLink to={`/teacher/${teacherId}`}>
            <li className="big">
                <div className="img"><img className ="TeacherAvatar" src={`http://localhost:3001/uploads/${picture}`} alt={"Teacher Avatar"}></img></div>
                <div className="center"><p>{firstName} {lastName}</p></div>
                <div className="left"><p>Details</p></div>
            </li>
            </NavLink>
        )   
    }
    
    render(){
        const list = this.state.teachers
        .filter(teacher => this.state.searchInput === '' 
                || ( (teacher.firstName+" "+teacher.lastName).indexOf(this.state.searchInput) !== -1) )
        .map(teacher => 
            <this.Teacher key={teacher.teacherId} teacherId={teacher.teacherId} firstName={teacher.firstName} lastName={teacher.lastName} picture={teacher.picture}/>);

        return (
            <div>
            { this.state.newTeacher && <AddTeacher updateTeachers = {this.getTeachers.bind(this)} />}
            <ul className="TeacherList">
                <div className="TeachersHeader">
                    <h1>teachers</h1>
                    <p onClick={this.AddTeacher} > Add teacher </p>
                    <input type="text" placeholder="Search.." className="Input" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                {
                    (list.length>0)? list : <p>"Can't find any teacher..."</p>
                }
            </ul>
            </div>
        )

    }

}

export default TeachersList;