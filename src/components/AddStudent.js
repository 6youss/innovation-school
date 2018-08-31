import React, {Component} from 'react';
import './Student.css'
import './AddStudent.css'

class AddStudent extends Component{

    state = {
        firstName:"",
        lastName:""
    };
    input;

    submit = ()=>{
        
        var formData = new FormData();

        formData.append("firstName",this.state.firstName);
        formData.append("lastName",this.state.lastName);
        if (this.input.files && this.input.files[0])
            formData.append("picture",this.input.files[0]);
        
        this.postData("http://localhost:3001/student/",formData);
    }

    
    
    uploadPicture = (e) =>{

        const avatar = document.getElementById("studentPicture");

        if(e.target.nodeName === "IMG"){
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

    postData(url,data) {
        
        return fetch(url, {
            method: "POST",               
            body: data
        })
        .then(response => response.json())
        .then(json=>{
            console.log(json);
        }); // parses response to JSON
    }

    Input = ({name,label,type,placeholder})=>{

        return (
            <div className="PersoInput">
                <p>{label}</p>
                <input name={name} type={type} placeholder={placeholder} 
                    onChange={this.handleChange.bind(this)}/>
            </div>
         )
    }

    handleChange(event) {
        let name=event.target.name , value=event.target.value;
        this.setState({
            [name] : value
        })
    }

    componentDidMount(){
        this.input = document.getElementById("fileInput");
    }

    render(){
        const Input=this.Input;

        return (
            <div className="AddStudent">
                <h1>Add Student</h1>
                <div className="formData">
                    <div className="StudentNewPicParent">
                    <div className="StudentNewPic">
                        <img id="studentPicture" src="./default-avatar.png" width="150px" onClick={this.uploadPicture}></img>
                    </div>
                    <p>+</p>
                    </div>
                    <div className="InputContainerStyle">
                        <Input name="firstName" label="First Name" type="text" placeholder="First Name..." />
                        <Input name="lastName" label="Last Name" type="text" placeholder="Last Name..." />
                        <Input name="birthday" label="Birthday" type="text" placeholder="Birthday..." />
                        <Input name="adress" label="Adress" type="text" placeholder="Adress..." />
                        <Input name="phone" label="Phone" type="text" placeholder="Phone..." />
                        <Input name="parentPhone" label="Parent Phone" type="text" placeholder="Parent Phone..." />
                        <input id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                        <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={this.uploadPicture}/>
                    </div>
                </div>
            </div>
        )   
    }
}



export default AddStudent;