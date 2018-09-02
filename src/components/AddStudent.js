import React, {Component} from 'react';
import './Student.css'
import './AddStudent.css'

import Input from "./Input"

class AddStudent extends Component{

    state = {
        fields:{},
        errors:{}
    };
    input;

    componentDidMount(){
        
        this.input = document.getElementById("fileInput");
    }
    
    uploadPicture = (e) =>{

        const avatar = document.getElementById("studentPicture");
        
        if(e.target.className === "hoverStyle"){
            this.input.click();
        }else{
            if (this.input.files && this.input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    avatar.src = e.target.result;
                };
                reader.readAsDataURL(this.input.files[0]);
            }
        }
      
    }

    submit = ()=>{
        if(this.validateForm()){

            var formData = new FormData();
            Object.keys(this.state.fields).forEach(fieldName=>{
                formData.append(fieldName,this.state.fields[fieldName]);
            });
            if (this.input.files && this.input.files[0])
                formData.append("picture",this.input.files[0]);
            
            const url = "http://localhost:3001/student/";
    
            return  fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(json=>{
                        this.props.updateStudents();
                        console.log("added student");
                    });
        }

    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["firstName","lastName","birthday","adress","phone","parentPhone"];
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
        fieldName = event.target.name,
        fieldValue = event.target.value;

        fields[fieldName] = fieldValue;

        if(errors[fieldName]){
            delete errors[fieldName];
        }

        switch (fieldName){
            case "firstName":
                if(fieldValue.length!==0 && fieldValue.length<5) {
                    errors[fieldName]="First name must be longer then 5 letters"
                }
            break; 
            case "lastName":
                if(fieldValue.length!==0 && fieldValue.length<5) {
                    errors[fieldName]="Last name must be longer then 5 letters"
                }
            break;  
            default:
            break;
        }
        this.setState({fields,errors});
    }

    render(){
        
        return (
            <div className="AddStudent">
                <h1>Add Student</h1>
                <div className="formData">
                    <div className="StudentNewPicParent">
                        <div className="StudentNewPic">
                            <img id="studentPicture" alt="avatar"  src="./default-avatar.png" width="150px"></img>
                            <div className="hoverStyle" onClick={this.uploadPicture} >
                                <p className="hoverStyle">Upload picture</p>
                            </div>                        
                        </div>
                        <p>+</p>
                    </div>
                    <div className="InputContainerStyle">
                        <Input 
                            name="firstName" 
                            label="First Name" 
                            type="text" 
                            placeholder="First Name..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["firstName"]}
                        />
                        <Input 
                            name="lastName" 
                            label="Last Name" 
                            type="text" 
                            placeholder="Last Name..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["lastName"]}
                        />
                        <Input 
                            name="birthday" 
                            label="Birthday" 
                            type="text" 
                            placeholder="Birthday..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["birthday"]}
                        />
                        <Input 
                            name="adress" 
                            label="Adress" 
                            type="text" 
                            placeholder="Adress..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["adress"]}
                        />
                        <Input 
                            name="phone" 
                            label="Phone" 
                            type="text" 
                            placeholder="Phone..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["phone"]}
                        />
                        <Input 
                            name="parentPhone" 
                            label="Parent Phone" 
                            type="text" 
                            placeholder="Parent Phone..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["parentPhone"]}
                        />
                        <input id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                        <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={this.uploadPicture}/>
                    </div>
                </div>
            </div>
        )   
    }
}



export default AddStudent;