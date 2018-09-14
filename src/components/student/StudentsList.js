import React from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'

const StudentsList = ({students,handleSelect,selectedStudents,handleNote,handleReview,presentStudents}) => {
    
    const StudentItem = ({studentId,firstName,lastName,picture})=>{
        return (
            <NavLink to={`/student/${studentId}`}>
                <li className="big">
                    <div className="img">
                        <img 
                            className ="StudentAvatar" 
                            src={`http://localhost:3001/uploads/${picture}`} 
                            alt={"Student Avatar"}>
                        </img>
                    </div>
                    <div className="center">
                        <p>{firstName} {lastName}</p>
                    </div>
                    <div className="left">
                        <p>Details</p>
                    </div>
                </li>
            </NavLink>
        )   
    }

    const StudentItemSelect = ({studentId,firstName,lastName,picture,select,selected})=>{
        return (
            <li className={(selected)?"bigSelected":"big"} onClick={select.bind(this,studentId)}>
                <div className="img">
                    <img 
                        className ="StudentAvatar" 
                        src={`http://localhost:3001/uploads/${picture}`} 
                        alt={"Student Avatar"}>
                    </img>
                </div>
                <div className="center">
                    <p>{firstName} {lastName}</p>
                </div>
                <div className="left">
                    <p>Details</p>
                </div>
            </li>
        )   
    }

    class StudentItemNote extends React.Component{
        state={
            observ:false
        }
        changeObserv = (e)=>{
            e.preventDefault();
            this.setState({
                observ: !this.state.observ
            });
        }
        render(){
            return (
                <li className={"big"}>
                    <div className="img">
                        <img 
                            className ="StudentAvatar" 
                            src={`http://localhost:3001/uploads/${this.props.picture}`} 
                            alt={"Student Avatar"}>
                        </img>
                    </div>
                    <div className="center">
                        <p>{this.props.firstName} {this.props.lastName}</p>
                    </div>
                    <div className="left">
                        <form onChange={this.props.note.bind(this,this.props.studentId)}>
                            <input 
                                type="radio" 
                                name="rGroup" 
                                value="Good" 
                                id={"r1"+this.props.studentId}
                                defaultChecked={this.props.present.evaluation==="Good"?true:false}
                            />
                            <label className="radio" htmlFor={"r1"+this.props.studentId}>Good</label>
                            <input 
                                type="radio" 
                                name="rGroup" 
                                value="Medium" 
                                id={"r2"+this.props.studentId}
                                defaultChecked={this.props.present.evaluation==="Medium"?true:false}
                            />
                            <label className="radio" htmlFor={"r2"+this.props.studentId}>Medium</label>
                            <input 
                                type="radio" 
                                name="rGroup" 
                                value="Weak" 
                                id={"r3"+this.props.studentId}
                                defaultChecked={this.props.present.evaluation==="Weak"?true:false}
                            />
                            <label className="radio" htmlFor={"r3"+this.props.studentId}>Weak</label>
                        </form>
                        <button onClick={this.changeObserv.bind(this)}>Observation</button>
                    </div>
                    {
                        this.state.observ && 
                            <textarea 
                                onChange={handleReview.bind(this,this.props.studentId)}
                                rows="4" 
                                columns="40"
                                defaultValue={this.props.present.observation}
                            />
                    }
                </li>
                
            )   
        }
    }
    const list = students
                .map(student => {
                    if(handleSelect){
                        return <StudentItemSelect 
                            key={student.studentId} 
                            studentId={student.studentId} 
                            firstName={student.firstName} 
                            lastName={student.lastName} 
                            picture={student.picture} 
                            select={handleSelect}
                            selected={(selectedStudents.indexOf(student.studentId)!==-1)}
                        />
                    }else{
                        if(handleNote){
                            return <StudentItemNote
                                key={student.studentId} 
                                studentId={student.studentId} 
                                firstName={student.firstName} 
                                lastName={student.lastName} 
                                picture={student.picture} 
                                note={handleNote}
                                present={presentStudents[student.studentId]}
                            />
                        }else
                        return <StudentItem 
                            key={student.studentId} 
                            studentId={student.studentId}
                            firstName={student.firstName} 
                            lastName={student.lastName} 
                            picture={student.picture} 
                        />
                    }
                });
                

    return (
        (list.length>0)? list : <p>"Can't find any student..."</p>
    )
} 
export default StudentsList;