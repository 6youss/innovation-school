import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import StudentsList from '../student/StudentsList';

import AddGroupStudents from './AddGroupStudents'
import AddGroupSessions from './AddGroupSessions'
import SessionsList from '../session/SessionsList'

import Modal from '../Modal'

class GroupDetails extends Component {

    state = {
        group : [],
        students:[],
        sessions:[],
        addGroupStudents:false,
        addGroupSessions:false,
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

    handleClose(){
        this.props.history.push('/group');
    }

    handleAddStudents(){
        this.setState({
            addGroupStudents:!this.state.addGroupStudents
        })
    }

    handleAddSessions(){
        this.setState({
            addGroupSessions:!this.state.addGroupSessions
        })
    }

    render(){
        const  {groupId,level,teacherId,firstName,lastName,moduleId,moduleName} = this.state.group;
        return (
            <Modal modalId='group-details' closeMe={this.handleClose.bind(this)}>
                <div className='group-details'>
                    <div className='group-details-row1'>
                        <div>
                            <h1>Group {groupId} </h1>
                            <NavLink to={`/module/${moduleId}`}>
                                <h2>Module: {moduleName} {level}</h2>
                            </NavLink>

                            <NavLink to={`/teacher/${teacherId}`}>
                                <h2>Teacher: {firstName} {lastName}</h2>
                            </NavLink>
                        </div>
                        <div>
                            <p>edit</p>
                            <p>delete</p>
                        </div>
                    </div>
                    <div className='group-details-row2'>
                        <div>
                            <div className='StudentsHeader'>
                                <h3>Sessions</h3>
                                <p onClick={this.handleAddSessions.bind(this)}>add</p>
                            </div>
                            <SessionsList
                                sessions={this.state.sessions}
                            />
                            {this.state.addGroupSessions &&
                                <AddGroupSessions
                                    group={this.state.group}
                                    currentSessions = {this.state.sessions}
                                    updateSessions = {this.updateSessions.bind(this)}
                                    handleAddSessions={this.handleAddSessions.bind(this)}
                                />
                            }
                            
                        </div>
                        
                        <div>
                            <div className='StudentsHeader'>
                                <h3>Students</h3>
                                <p onClick={this.handleAddStudents.bind(this)}>add</p>
                            </div>
                            <StudentsList students={this.state.students}/>

                            { this.state.addGroupStudents &&
                                <AddGroupStudents
                                    group={this.state.group}
                                    currentStudents = {this.state.students}
                                    updateStudents = {this.updateStudents.bind(this)}
                                    handleAddStudents={this.handleAddStudents.bind(this)}
                                />
                            }
                        </div>
                        <h3>Exams</h3>
                        
                    </div>
                    
                </div>
            </Modal>
        )
    }

}

export default withRouter(GroupDetails);