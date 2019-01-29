import React, {Component} from 'react';

import Select from "../Select"

const levels = ["A1","A2","B1","B2","C1","C2"];

class Addgroup extends Component{

    state = {
        modules:[],
        teachers:[],
        fields:{},
        errors:{}
    };

    componentDidMount(){
        this.getData(); 
    }

    getData(){

        let modules = fetch(`${process.env.REACT_APP_SERVER_URL}/module`)
        .then( res => res.json()) ,
        teachers= fetch(`${process.env.REACT_APP_SERVER_URL}/teacher`)
        .then( res => res.json());
        
        Promise.all([modules, teachers])
        .then(([modules,teachers])=>{
            this.setState({
                modules:modules?modules.modules:[],
                teachers:teachers?teachers.teachers:[]
            });
        } )
        
        
    }
    
    submit = ()=>{
        if(this.validateForm()){
            
            const group=JSON.stringify({
                moduleId: this.state.fields.module,
                teacherId: this.state.fields.teacher,
                level: this.state.fields.level
            });

            const url = `${process.env.REACT_APP_SERVER_URL}/group/`;
            
            return fetch(url, {
                        method: "POST",        
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: group
                    })
                    .then(response => response.json())
                    .then(json=>{
                        console.log(json);
                        this.props.updateGroups();
                    });
        }
    }

    validateForm(){
        let fields = this.state.fields;
        const fieldNames = ["level","module","teacher"];
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
        fieldName = event.target.name,
        fieldValue = event.target.value;
        
        
        switch(fieldName){
            case 'module': 
                fieldValue = event.target.options[event.target.options.selectedIndex].getAttribute('data-key');
            break;
            case 'teacher': 
                fieldValue = event.target.options[event.target.options.selectedIndex].getAttribute('data-key');
            break;
            default:

        }
        fields[fieldName] = fieldValue;
        this.setState({
            fields
        });
    }

    render(){
        const moduleOptions = this.state.modules.map(module=>({
            key: module.moduleId,
            value: module.moduleName
        }));
        const teacherOptions = this.state.teachers.map(teacher=>({
            key: teacher.teacherId,
            value: teacher.firstName+" "+teacher.lastName
        }));
        const levelOptions = levels.map(level=>({
            key: level,
            value: level
        }));
        return (
                <div className="add-group">
                    <Select
                        className = "add-group-item"
                        label="Module"
                        name="module"
                        options={moduleOptions}
                        handleChange={this.handleChange.bind(this)}
                        error={this.state.errors["module"]}
                    />
                    <Select
                        className = "add-group-item"
                        label="Teacher"
                        name="teacher"
                        options={teacherOptions}
                        handleChange={this.handleChange.bind(this)}
                        error={this.state.errors["teacher"]}
                    />
                    <Select
                        className = "add-group-item"
                        label="Level"
                        name="level"
                        options={levelOptions}
                        handleChange={this.handleChange.bind(this)}
                        error={this.state.errors["level"]}
                    />
                    <input 
                        id="Add-button" 
                        type="submit" 
                        value="Add"
                        className="button button-edit"
                        onClick={this.submit}
                    />
                </div>
        )   
    }
}



export default Addgroup;