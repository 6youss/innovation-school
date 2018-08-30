import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'


class AddStudent extends Component{

    state = {
        firstName:"",
        lastName:""
    };

    submit = ()=>{
        const student ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }
        this.postData("http://localhost:3001/student/",student);
    }
    
    uploadPicture = (e) =>{

        const input = document.getElementById("fileInput");
        const avatar = document.getElementById("studentPicture");

        if(e.target.nodeName === "IMG"){
            input.click();
        }else{
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    avatar.src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
      
    }

    postData(url,data) {
          return fetch(url, {
              method: "POST", 
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },              
              body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
          .then(response => response.json()); // parses response to JSON
    }



    Input = ({name,label,type,placeholder})=>{
        return (
            <div className="persoInput">
                <p>{label}</p>
                <input name={name} type={type} placeholder={placeholder} onChange={this.handleChange.bind(this)}/>
            </div>
         )
    }

    handleChange(event) {
        let name=event.target.name , value=event.target.value;
        this.setState({
            [name] : value
        })
    }

    render(){
        const Input=this.Input;
        return (
            <div className="StudentDetails">
                <h1>Add Student</h1>
                <div className="StudentInfo">
                    <img id="studentPicture" src="./default-avatar.png" width="150px" onClick={this.uploadPicture}></img>
                </div>
                <div className="StudentInfo">

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
        )   
    }
}



export default AddStudent;