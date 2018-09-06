import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Teacher.css'
import ListHeader from '../ListHeader';


class Teacher extends Component {

    state = {teacher : []}

    teacherId = this.props.match.params.id;

    componentDidMount(){
        fetch("http://localhost:3001/teacher/"+this.teacherId)
        .then( res => res.json())
        .then(json=>{
            this.setState({
                teacher : json.teacher[0]
            });
        });
    }

    Groupe = ({groupeId,moduleName})=>{
        return (
            <NavLink to={`/groupe/${groupeId}`}>
            <li className="big">
                <div className="img"><p></p></div>
                <div className="center"><p></p></div>
                <div className="left"><p></p></div>
            </li>
            </NavLink>
        )
    }

    Session =  ({sessionId,groupeId,roomId,date,sessionDone})=>{
        return (
            <NavLink to={`/session/${sessionId}`}>
            <li className="big">
                <div className="img"><p></p></div>
                <div className="center"><p></p></div>
                <div className="left"><p></p></div>
            </li>
            </NavLink>
        )   
    }

    Payment = ({paymentId,price,date,done})=>{
        return (
            <NavLink to={`/payment/${paymentId}`}>
            <li className="big">
                <div className="img"><p></p></div>
                <div className="center"><p></p></div>
                <div className="left"><p></p></div>
            </li>
            </NavLink>
        )   
    }

    render(){

        const {firstName,lastName,picture} = this.state.teacher;
        
        return (
            <div>
            <div className="TeacherDetails">
                <div style={{float:"right"}}>
                    <p>edit</p>
                    <p>delete</p>
                </div>

                <aside className="PictureContainer">
                    <img className ="TeacherPicture" 
                        src={(picture)?`http://localhost:3001/uploads/${picture}`: "../default-avatar.png" }
                        alt={"Teacher Avatar"}
                    />
                </aside>

                <div className="TeacherInfo">
                    <h1>{firstName} {lastName}</h1>
                    <p>Inscription date: 01/01/19</p>
                    <p>Birthday: 01/01/19</p>
                    <p>Phone Number: </p>
                    <p>Parent Number: </p>
                </div>

            </div>
            <div className="TeacherDetails">
                <ListHeader title="Groups" />
                <ListHeader title="Sessions" />
                <ListHeader title="Payments" icons="Add" />
            </div>
            </div>
        )
    }

}

export default Teacher;