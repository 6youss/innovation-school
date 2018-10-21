import React, {Component} from 'react';

import Input from "../Input"

class AddTeacher extends Component{

    state = {
        fields:{},
        errors:{}
    };
    input;

    componentDidMount(){
        this.input = document.getElementById("fileInput");
    }
    
    uploadPicture = (e) =>{

        const avatar = document.getElementById("TeacherPicture");
        
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
            
            const url = "http://localhost:3001/teacher/";
    
            return  fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(json=>{
                        this.props.updateTeachers();
                        console.log("Added Teacher: "+ json);
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
            <div className='add-teacher-container'>
                <h1>Add Teacher</h1>
                <div className="row-container">
                    <div className="StudentNewPicParent">
                        <div className="StudentNewPic">
                            <img 
                                id="studentPicture" 
                                alt="avatar"  
                                src="./default-avatar.png" 
                                width="150px"
                                ref={avatar=>this.avatar=avatar}
                            />
                            <div className="hoverStyle" onClick={this.uploadPicture} >
                                <p>Upload picture</p>
                            </div>
                        </div>
                        <img src='../add_photo.svg'/>
                    </div>

                    <div className="InputContainerStyle">
                        <div className="PersoInput">
                            <Input 
                                name="firstName" 
                                label="First Name" 
                                type="text" 
                                placeholder="First Name..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["firstName"]}
                            />
                        </div>
                        <div className="PersoInput">
                            <Input 
                                name="lastName" 
                                label="Last Name" 
                                type="text" 
                                placeholder="Last Name..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["lastName"]}
                            />
                        </div>
                        <div className="PersoInput">
                            <Input 
                                name="birthday" 
                                label="Birthday" 
                                type="text" 
                                placeholder="Birthday..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["birthday"]}
                            />
                        </div>
                        <div className="PersoInput">
                            <Input 
                                name="adress" 
                                label="Adress" 
                                type="text" 
                                placeholder="Adress..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["adress"]}
                            />
                        </div>
                        <div className="PersoInput">
                            <Input 
                                name="phone" 
                                label="Phone" 
                                type="text" 
                                placeholder="Phone..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["phone"]}
                            />
                        </div>
                        <div className="PersoInput">
                            <Input 
                                name="parentPhone" 
                                label="Parent Phone" 
                                type="text" 
                                placeholder="Parent Phone..." 
                                handlechange={this.handleChange.bind(this)}
                                error={this.state.errors["parentPhone"]}
                            />
                        </div>
                        <input id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                        <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={this.uploadPicture}/>
                    </div>
                </div>
            </div>
        )   
    }
}



export default AddTeacher;