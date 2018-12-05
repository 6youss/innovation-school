import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group';

import Modal from '../Modal'

import SessionsList from '../session/SessionsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TeacherDetails extends Component {

    state = {
        teacher:'',
        sessions:[],
        groups:[],
    }

    teacherId = this.props.match.params.id;
    
    componentDidMount(){
        
        fetch("http://192.168.1.5:3001/teacher/"+this.teacherId)
        .then( res => res.json())
        .then(json=>{
            console.log(json);
            if(json.teacher.length>0)
            this.setState({
                teacher : json.teacher[0]
            });
        });

        fetch("http://192.168.1.5:3001/teacher/"+this.teacherId+"/sessions")
        .then( res => res.json())
        .then(json=>{
            
            this.setState({
                sessions : json.sessions
            });
        });

    }

    deleteTeacher(){
        var result = window.confirm("Do you really want to delete this teacher?");
        if (result) {
            fetch("http://192.168.1.5:3001/teacher/"+this.teacherId, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json=>{
                if(!json.error){
                    this.props.history.push('/teacher');
                }else{
                    console.log(json);
                } 
            });
        }
    }
    render(){

        const {
            firstName, 
            lastName,
            sex, 
            picture, 
            birthday, 
            adress, 
            phone, 
            inscriptionDate
         } = this.state.teacher;
        
        return (
            <Modal modalId={'teacherDetails'} closeMe={this.props.history.goBack}>
                <CSSTransition
                        key={2}
                        in={true}
                        appear={true}
                        classNames='student-details'
                        timeout={200}
                        unmountOnExit
                >
                <div className="student-details">
                    <div className='details-row-container1'>
                        <img className ="student-picture student-pic"
                            src={`http://192.168.1.5:3001/uploads/${picture}`}
                            alt={"Student Avatar"}
                            onError={(e)=>{e.target.src=sex?"../default-avatar.png":"../default-avatar-female.png"}}
                        /> 
                        <div className ="student-props">
                            <h1>{firstName} {lastName}</h1>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='address-book'/>
                                <strong>Adress:</strong> {adress}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='sign-in-alt'/>
                                <strong>Inscription date:</strong> {inscriptionDate}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='birthday-cake'/>
                                <strong>Birthday:</strong> {birthday}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='phone'/>
                                <strong>Phone Number:</strong> {phone}
                            </p>
                        </div>
                        <div className ="buttons">
                            <button onClick={this.deleteTeacher} className="button button-edit">
                                <FontAwesomeIcon className='button-icon' icon="edit"/>Edit
                            </button>
                            <p/>
                            <button onClick={this.deleteTeacher} className="button button-delete">
                                <FontAwesomeIcon className='button-icon' icon="trash-alt"/>Delete
                            </button>
                        </div>
                    </div>
                    <div className='details-row-container2'>
                        <div>
                            <h3>Sessions</h3>
                            <SessionsList
                                sessions={this.state.sessions}
                            />
                        </div>
                    </div>
                </div>
                </CSSTransition>
            </Modal>
        )
    }

}

export default withRouter(TeacherDetails);