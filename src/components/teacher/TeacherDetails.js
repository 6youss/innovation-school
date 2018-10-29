import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group';

import Modal from '../Modal'

import SessionsList from '../session/SessionsList';


class TeacherDetails extends Component {

    state = {
        teacher:'',
        sessions:[],
        groups:[],
    }

    teacherId = this.props.match.params.id;
    
    componentDidMount(){
        
        fetch("http://localhost:3001/teacher/"+this.teacherId)
        .then( res => res.json())
        .then(json=>{
            if(json.teacher.length>0)
            this.setState({
                teacher : json.teacher[0]
            });
        });

        fetch("http://localhost:3001/teacher/"+this.teacherId+"/sessions")
        .then( res => res.json())
        .then(json=>{
            
            this.setState({
                sessions : json.sessions
            });
        });

    }

    render(){
        
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
                        <h1>{this.state.teacher.firstName} {this.state.teacher.lastName}</h1>
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