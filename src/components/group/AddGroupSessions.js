import React, {Component} from 'react';

import Select from "../Select"
import Modal from "../Modal"

var today = new Date();
var currentYear = today.getFullYear();
let days=[],months=[],years=[],minutes=[],hours=[];

for(let i=1;i<61;i++){
    if(i<25)
        hours.push({
            key:i,
            value:i<11?"0"+(i-1):(i-1)
        })
    if((i-1)%15 === 0)
        minutes.push({
            key:i,
            value:i<11?"0"+(i-1):(i-1)
        });
    if(i<13)
        months.push({
            key:i,
            value:i
        });
    if(i<32)
        days.push({
            key:i,
            value:i
        })
    if(i<3)
        years.push({
            key:i,
            value:""+(currentYear+i-1)
        });
}

class AddGroupSessions extends Component{

    state = {
        rooms:[],
        teachers:[],
        fields:{},
        errors:{}
    };

    componentDidMount(){
        this.getData();
    }

    getData(){
        fetch(`${process.env.REACT_APP_SERVER_URL}/room/`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                rooms: json.rooms.map(room=>({key:room.roomId,value:room.roomId}))
            });
        });
        fetch(`${process.env.REACT_APP_SERVER_URL}/teacher/`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                teachers: json.teachers.map(teacher=>({
                    key:teacher.teacherId,
                    value:`${teacher.firstName} ${teacher.lastName}`
                }))
            });
        });
    }

    submit = ()=>{
        if(this.validateForm()){
            const groupId = this.props.group.groupId;
            
            const sessionDate = `${this.state.fields.year}-${this.state.fields.month}-${this.state.fields.day} ${this.state.fields.hour}:${this.state.fields.minute}:00`
            
            const session=JSON.stringify({
                groupId: groupId,
                roomId: this.state.fields.roomId,
                sessionDate: sessionDate,
                teacherId: this.state.fields.teacherId
            });
    
            fetch(`${process.env.REACT_APP_SERVER_URL}/session/`, {
                method: "POST",        
                headers:{
                    'Content-Type': 'application/json'
                },
                body: session
            })
            .then(response => response.json())
            .then(json=>{
                console.log(json);
            });
        }   
    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["minute","hour","day","month","year","roomId"];
        const errors={};
        
        fieldNames.forEach(fieldName=>{
            if( !fields[fieldName] ){
                errors[fieldName]= fieldName+" is required";
            }
        });
        
        this.setState({
            errors:{...errors,...this.state.errors}
        });
        
        return Object.keys(this.state.errors).length === 0;
    }

    handleChange(event) {
        let fields = this.state.fields,
        errors = this.state.errors,
        fieldName = event.target.name,fieldValue;
        
        switch(fieldName){
            case 'teacherId': 
                fieldValue = event.target.options[event.target.options.selectedIndex].getAttribute('data-key');
            break;
            default:
            fieldValue = event.target.value;
        }
        fields[fieldName] = fieldValue;
        if(errors[fieldName]){
            delete errors[fieldName];
        }
        
        this.setState({fields,errors});
    }


    render(){

        return (
            <Modal modalId='group-sessions' closeMe={this.props.handleAddSessions}>
                <div className='student-details'>
                    <h1 className='add-session-title'>Add Session</h1>
                    <div className='add-session-inputs'>
                        <Select
                            label="Teacher"
                            name="teacherId"
                            options={this.state.teachers}
                            handleChange={this.handleChange.bind(this)}
                            error={this.state.errors["teacherId"]}
                        />
                        <Select
                            label="Room"
                            name="roomId"
                            options={this.state.rooms}
                            handleChange={this.handleChange.bind(this)}
                            error={this.state.errors["roomId"]}
                        />
                        <div className='session-date'>
                            <Select
                                label="Date"
                                name="day"
                                options={days}
                                handleChange={this.handleChange.bind(this)}
                                error={this.state.errors["day"]}
                            />
                            <Select
                                label=""
                                name="month"
                                options={months}
                                handleChange={this.handleChange.bind(this)}
                                error={this.state.errors["month"]}
                            />
                            <Select
                                label=""
                                name="year"
                                options={years}
                                handleChange={this.handleChange.bind(this)}
                                error={this.state.errors["year"]}
                            />
                        </div>
                        <div className='session-time'>
                            <Select
                                label="Hour"
                                name="hour"
                                options={hours}
                                handleChange={this.handleChange.bind(this)}
                                error={this.state.errors["hour"]}
                            />
                            <Select
                                label=""
                                name="minute"
                                options={minutes}
                                handleChange={this.handleChange.bind(this)}
                                error={this.state.errors["minute"]}
                            />
                        </div>
                    </div>
                    <div className='add-session-inputs'>
                        <input 
                            id="Add-button" 
                            type="submit" 
                            value="Add" 
                            onClick={this.submit}
                            className='button button-edit'
                        />
                    </div>
                    </div>
                
            </Modal>
        )   
    }
}



export default AddGroupSessions;