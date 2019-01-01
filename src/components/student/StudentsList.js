import React from 'react';
import {NavLink} from 'react-router-dom';
import Loader from '../HOC/Loader';


const StudentsList = ({students,handleDetails,handleSelect,selectedStudents,handleNote,handleReview,presentStudents}) => {
    
    const StudentItem = ({studentId,firstName,lastName,picture,sex})=>{
        const picSrc = picture? 
                        `http://192.168.1.5:3001/uploads/${picture}`
                        :
                        (sex?"/default-avatar.png":"/default-avatar-female.png");
        return (
            <NavLink className="student-item-container" to={'/student/'+studentId}>
                <div className="student-list-item">
                    <img
                        className ="StudentAvatar"
                        src={picSrc}
                        alt={"Student Avatar"}
                        onError={(e)=>{e.target.src=(sex?"/default-avatar.png":"/default-avatar-female.png")}}
                    />                
                    <p>{firstName} {lastName}</p>
                </div>
            
            </NavLink>
        )
    }

    const StudentItemSelect = ({studentId,firstName,lastName,picture,select,selected})=>{
        return (
            <li className="student-item-container" onClick={select.bind(this,studentId)}>
                <div className={selected?"student-list-item selected":"student-list-item"}>
                    <img
                        className ="StudentAvatar"
                        src={picture?`http://192.168.1.5:3001/uploads/${picture}`:"../default-avatar.png"}
                        alt={"Student Avatar"}
                        onError={(e)=>{e.target.src="../default-avatar.png"}}
                    />
                    <p>{firstName} {lastName}</p>
                </div>
            </li>
        )   
    }

    class StudentItemNote extends React.Component{
        state={
            observ:false
        }
        changeObserv = (e)=>{
            if(e.target.id!=='review-text')
                this.setState({
                    observ: !this.state.observ
                });
        }
        
        render(){
            return (
                <div className="student-item-container">
                    <li className="student-list-item justify-center" onClick={this.changeObserv.bind(this)}>
                        <img
                            className ="StudentAvatar"
                            src={this.props.picture?`http://192.168.1.5:3001/uploads/${this.props.picture}`:"../default-avatar.png"}
                            alt={"Student Avatar"}
                            onError={(e)=>{e.target.src="../default-avatar.png"}}
                        />
                        <div>
                            <p>{this.props.firstName} {this.props.lastName}</p>
                        </div>
                        <div className='left'>
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
                            
                        </div>
                    </li>
                    {this.state.observ && 
                        <div>
                            <textarea className='review-text'
                                id='review-text'
                                onChange={handleReview.bind(this,this.props.studentId)}
                                rows="4" 
                                columns="40"
                                defaultValue={this.props.present.observation}
                            />
                        </div>
                    }
                </div>
                
            )   
        }
    }

    const list = students
                .map(student => {
                    if(handleSelect){
                        return <StudentItemSelect 
                            key={student.studentId} 
                            {...student}
                            select={handleSelect}
                            selected={(selectedStudents.indexOf(student.studentId)!==-1)}
                        />
                    }else{
                        if(handleNote){
                            return <StudentItemNote
                                key={student.studentId} 
                                {...student}
                                note={handleNote}
                                present={presentStudents[student.studentId]}
                            />
                        }else
                        return <StudentItem 
                            key={student.studentId} 
                            {...student}
                        />
                    }
                });
    return (
        students.length>0? list : <p>"Can't find any student..."</p>
    )
} 
export default Loader('students')(StudentsList);