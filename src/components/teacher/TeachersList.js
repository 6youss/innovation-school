import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

class TeachersList extends Component {
    
    state = {
        searchInput:""
    }
    
    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
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
        const list = this.props.teachers
        .filter(teacher => this.state.searchInput === '' 
                || ( (teacher.firstName+" "+teacher.lastName).indexOf(this.state.searchInput) !== -1) )
        .map(teacher => 
            <this.Teacher key={teacher.teacherId} teacherId={teacher.teacherId} firstName={teacher.firstName} lastName={teacher.lastName} picture={teacher.picture}/>);

        return (
            <div>
            <div className="TeacherList">
                <div className="TeachersHeader">
                    <input type="text" placeholder="Search.." className="Input" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                {
                    (list.length>0)? list : <p>"Can't find any teacher..."</p>
                }
            </div>
            </div>
        )

    }

}

export default TeachersList;