import React, {Component} from 'react';
import Input from "../Input"
import Modal from "../Modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddStudent extends Component {

    state = {
        fields:{},
        errors:{}
    };
    
    componentDidMount(){
        
    }
    
    uploadPicture = (e,setavatar) =>{
        let avatar = this.avatar;
        if(!setavatar){
            this.fileInput.click();
        }else{
            var reader = new FileReader();
            reader.onload = function (e) {
                avatar.src = e.target.result;
            };
            reader.readAsDataURL(this.fileInput.files[0]);
        }      
    }

    submit = (e)=>{
        e.preventDefault();
        if(this.validateForm()){
            var formData = new FormData();
            Object.keys(this.state.fields).forEach(fieldName=>{
                
                formData.append(fieldName,this.state.fields[fieldName]);
            });
            if (this.fileInput.files && this.fileInput.files[0])
                formData.append("picture",this.fileInput.files[0]);
            
            return  fetch("http://192.168.1.5:3001/student/", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(json=>{
                        if(!json.error){
                            this.props.updateStudents();
                            this.props.addStudent();
                        }else{
                            console.log(json.error);
                        } 
                    });
        }

    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["firstName","lastName"];//,"birthday","adress","phone","parentPhone"
        const errors={};
        
        fieldNames.forEach(fieldName=>{
            if( !fields[fieldName] ){
                errors[fieldName]= fieldName+" is required";
            }
        });

        this.setState({
            errors:{...errors,...this.state.errors}
        });
        
        return Object.keys(this.state.errors).length === 0 && Object.keys(errors).length === 0;
    }

    handleChange(event) {
        
        let fields = this.state.fields,
        errors = this.state.errors,
        fieldName = event.target.name,
        //format as first letter upper case
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

    handleDate=(date)=>{
        
        this.setState({
            fields:{...this.state.fields,
                selectedDate:date,
                birthday: date.toISOString().slice(0,10)
            }
        });
    }

    render(){
        
        return (
            <Modal modalId='add-student' closeMe={this.props.addStudent}>
                <form className="row-container" onSubmit={this.submit}>
                
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
                        <img alt='addpic_icon' src='../add_photo.svg'/>
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
                            <p style={{margin: '0px 0px 3px'}}>Birthday</p>
                            <DatePicker
                                selected={this.state.fields.selectedDate}
                                onChange={this.handleDate}
                                placeholderText="Click or write to set a date"
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
                        <input className="button button-edit" type="submit" value="Add"/>
                        <input 
                            id="fileInput" 
                            type="file" 
                            accept="image/*" 
                            style={{display:"none"}} 
                            onChange={this.uploadPicture.bind(this,true)}
                            ref={fileInput=>this.fileInput=fileInput}
                        />
                    </div>
                </form>
            </Modal>
        )   
    }
}



export default AddStudent;