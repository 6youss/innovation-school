import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import StudentsList from '../student/StudentsList';

import AddGroupStudents from './AddGroupStudents'
import AddGroupSessions from './AddGroupSessions'
import SessionsList from '../session/SessionsList'
class GroupDetails extends Component {

    state = {
        group : [],
        students:[],
        sessions:[]
    }

    groupId = this.props.match.params.id;

    componentDidMount(){
        const group = fetch("http://localhost:3001/group/"+this.groupId)
        .then( res => res.json()),

        students = fetch("http://localhost:3001/group/"+this.groupId+"/students")
        .then( res => res.json()),

        sessions = fetch("http://localhost:3001/group/"+this.groupId+"/sessions")
        .then( res => res.json());

        Promise.all([group,students,sessions])
        .then(([groupRes,studentsRes,sessionsRes])=>{
            this.setState({
                group: groupRes.group[0],
                students: studentsRes.students,
                sessions: sessionsRes.sessions
            });
        });
    }

    updateStudents(){
        fetch("http://localhost:3001/group/"+this.groupId+"/students")
        .then( res => res.json())
        .then(students=>{
            this.setState({students:students.students});
        });

    }

    updateSessions(){
        fetch("http://localhost:3001/group/"+this.groupId+"/sessions")
        .then( res => res.json())
        .then(sessions=>{
            this.setState({sessions:sessions.sessions});
        });
    }

    render(){

        const  {groupId,level,teacherId,firstName,lastName,moduleId,moduleName} = this.state.group;
        return (
            <div>
                <h2>Sessions</h2>
                <AddGroupSessions
                    group={this.state.group}
                    currentSessions = {this.state.sessions}
                    updateSessions = {this.updateSessions.bind(this)}
                />
                <SessionsList
                    sessions={this.state.sessions}
                />
                <h1>Group: {groupId} </h1>
                <NavLink to={`/module/${moduleId}`}>
                    <h2>Module: {moduleName} {level}</h2>
                </NavLink>

                <NavLink to={`/teacher/${teacherId}`}>
                    <h2>Teacher: {firstName} {lastName}</h2>
                </NavLink>
                <h2>Students</h2>
                <StudentsList students={this.state.students}/>
                <h2>Add Students</h2>
                <AddGroupStudents
                    group={this.state.group}
                    currentStudents = {this.state.students}
                    updateStudents = {this.updateStudents.bind(this)}
                />
                
                <h2>Exams</h2>

            </div>
        )
    }

}

export default GroupDetails;