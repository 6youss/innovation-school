import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'


class Student extends Component {

    state = {student : []}

    studentId = this.props.match.params.id;

    componentDidMount(){
        fetch("http://localhost:3001/student/"+this.studentId)
        .then( res => res.json())
        .then(json=>{
            this.setState({
                student : json.student[0]
            });
        });
    }

    render(){

        const {firstName,lastName,picture,studentId} = this.state.student;
        
        return (
            <div>
            <div className="StudentDetails">
                <div style={{float:"right"}}>
                    <p>edit</p>
                    <p>delete</p>
                </div>

                <aside className="PictureContainer">
                    <img className ="StudentPicture" 
                        src={(picture)?`http://localhost:3001/uploads/${picture}`: "../default-avatar.png" }
                        alt={"Student Avatar"}
                    />
                </aside>

                <div className="StudentInfo">
                    <h1>Name: {firstName} {lastName}</h1>
                    <p>Inscription date: 01/01/19</p>
                    <p>Birthday: 01/01/19</p>
                    <p>Age: 01/01/19</p>
                    <p>Phone Number: </p>
                    <p>Parent Number: </p>
                    <p>groups: </p>
                </div>

            </div>
            <div className="StudentDetails">
                <div className="StudentInfo">
                    <h3>Payment Info</h3>
                </div>
                <div className="StudentInfo">
                    <h3>Sessions</h3>
                </div>
            </div>
            </div>
        )
    }

}

export default Student;