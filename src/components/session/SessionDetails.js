import React, {Component} from 'react';
import StudentsList from '../student/StudentsList';

class SessionDetails extends Component {
    
    state = {
        session:{},
        students:[],
        presentStudents:{},
        absentStudents:[],
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_SERVER_URL}/session/${this.props.match.params.id}`)
        .then( res => res.json())
        .then(json=>{
            const session = json.session[0];
            this.setState({session});
            this.getSessionStudents(session.sessionId,session.groupId,session.sessionDone);
        });        
    }

    getSessionStudents(sessionId,groupId,sessionDone){
        if(sessionDone){
            const students=fetch(`${process.env.REACT_APP_SERVER_URL}/session/${sessionId}/students`)
            .then( res => res.json());
            
            const studentsReviews = fetch(`${process.env.REACT_APP_SERVER_URL}/session/${sessionId}/reviews`)
            .then( res => res.json());
            
            Promise.all([students,studentsReviews])
            .then(([students,studentsReviews])=>{

                let presentStudents = {};

                studentsReviews.reviews.forEach(
                    student=>{
                        presentStudents[student.studentId]={
                            evaluation:student.evaluation,
                            observation:student.observation
                        }
                    }
                )
                
                this.setState({
                    students : students.students,
                    presentStudents
                });
            });
                
        }else{
            fetch(`${process.env.REACT_APP_SERVER_URL}/group/${groupId}/students`)
            .then( res => res.json())
            .then(json=>{
                let presentStudents = {};
                json.students.forEach(student=>{
                    presentStudents[student.studentId]={
                        evaluation:"Medium",
                        observation:"Write an observation"
                    }
                });
                this.setState({
                    students : json.students,
                    presentStudents
                });
            });
        }
    }

    handleSelect(studentId){
        let absentStudents = this.state.absentStudents;
        let studentIndex = absentStudents.indexOf(studentId);
        
        if(studentIndex === -1){
            absentStudents.push(studentId);
        }else{
            absentStudents.splice(studentIndex,1);
        }
        this.setState({absentStudents});
    }

    markAbsents(){
        let markStudents=[];
        this.state.students.forEach(student => {
            if( (this.state.absentStudents.indexOf(student.studentId) !== -1) )
                markStudents.push(
                    fetch(`${process.env.REACT_APP_SERVER_URL}/session/${this.state.session.sessionId}/absent`,{
                        method: "POST",        
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(student)
                    })
                    .then( res => res.json())
                );
            else{
                markStudents.push(
                    fetch(`${process.env.REACT_APP_SERVER_URL}/session/${this.state.session.sessionId}/present`,{
                        method: "POST",        
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                    studentId: student.studentId,
                                    evaluation: this.state.presentStudents[student.studentId].evaluation,
                                    observation: this.state.presentStudents[student.studentId].observation
                                })
                    })
                    .then( res => res.json())
                );
            }
        });

        Promise.all(markStudents)
        .then(results=>{
            this.setSessionDone();
        });
    }

    markPresence(){
        const presence = 
        this.state.students.map(student=> ({
                studentId: student.studentId,
                evaluation: this.state.presentStudents[student.studentId].evaluation,
                observation: this.state.presentStudents[student.studentId].observation
            })
        )
        const addPresence=[];
        presence.forEach(present => {
            addPresence.push(
                fetch(`${process.env.REACT_APP_SERVER_URL}/session/${this.state.session.sessionId}/present`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(present)
                })
                .then( res => res.json())
            );

        });

        Promise.all(addPresence)
        .then(results=>{
            console.log(results);
        });

    }
    
    setSessionDone(){
        const session = {
            ...this.state.session,
            sessionDone:1
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/session/`,{
            method: "PUT",        
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session)
        })
        .then( res => res.json())
        .then(json=>{
            this.setState({session});
            this.getSessionStudents(session.sessionId,session.groupId,session.sessionDone);
        });
    }
    
    handleNote(studentId,e){
        const evaluation = e.target.value;
        let presentStudents = this.state.presentStudents;
        presentStudents[studentId].evaluation = evaluation;
    }
    
    handleReview(studentId,e){
        const observation = e.target.value;
        let presentStudents = this.state.presentStudents;
        presentStudents[studentId].observation = observation;
    }

    render(){
        const sessionDone = this.state.session.sessionDone;
        return (
            <div style={{width:'100%'}}>
                {sessionDone?
                    <div>
                        <h3>Mark Notes:</h3>
                        <StudentsList
                            students={this.state.students}
                            presentStudents={this.state.presentStudents}
                            handleNote = {this.handleNote.bind(this)}
                            handleReview = {this.handleReview.bind(this)}
                        />
                    </div>
                    :
                    <div>
                        <h3>Mark absents:</h3>
                        <StudentsList
                            students={this.state.students}
                            selectedStudents={this.state.absentStudents}
                            handleSelect = {this.handleSelect.bind(this)}
                        />
                    </div>
                }
                <input 
                    className='button button-edit'
                    id="Add-button" 
                    type="submit" 
                    value="Submit" 
                    onClick={sessionDone? this.markPresence.bind(this) : this.markAbsents.bind(this)}
                />
            </div>
        )
    }
}

export default SessionDetails;