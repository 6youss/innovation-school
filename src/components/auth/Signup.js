import React, {Component} from 'react';
import Input from "../Input"

import {withRouter} from 'react-router-dom'

class Signup extends Component{

    state = {
        fields:{},
        errors:{},
    };

    componentDidMount(){
        
    }
    
    submit = (e)=>{
      e.preventDefault();
      if(this.validateForm()){
          fetch('http://192.168.1.5:3001/user/signup',{
              method:'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.fields) 
          })
          .then(res=>res.json())
          .then(res=>{
            if(res.error){
                console.log(res.error);
                const errors = {...this.state.errors,signup:'Sign up failed'};
                this.setState({
                    errors
                });
            }else{
                this.props.history.push('/signin');
            }
          })
          .catch(err=>{
            console.log(err);
          });
      }
    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["userName","password",'userType','typeId'];
        const errors=this.state.errors;
        
        fieldNames.forEach(fieldName=>{
            if( !fields[fieldName] ){
                errors[fieldName]= fieldName+" is required";
            }
        });

        delete errors['signup'];

        this.setState({
            errors
        });
        
        return Object.keys(errors).length === 0;
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

        // var regex = /^[0-9]*$/gm;
        // function validateEmail(email) {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
        // switch (fieldName){
        //     case "email":
        //         if(fieldValue.length!==0) {
        //             errors[fieldName]="Not a valid email"
        //         }
        //     break; 
        //     case "password":
        //         if(fieldValue.length!==0 && !regex.test(fieldValue)) {
                    
        //             event.target.value ="";
        //         }
        //     break;  
        //     default:
        //     break;
        // }
        this.setState({fields,errors});
    }

    render(){
        return (
            <div className="add-room-container">
                <h1>Sign Up</h1>
                <form className='add-room-input' onSubmit={this.submit}>
                    <Input
                        name="userName"
                        label="User Name"
                        type="text"
                        placeholder="User Name..."
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["userName"]}
                    />
                    <Input
                        name="password" 
                        label="Password"
                        type="password" 
                        placeholder="Password..."
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["password"]}
                    />
                    <Input
                        name="userType" 
                        label="User Type (0 for admin / 1 for teacher)"
                        type="text" 
                        placeholder="User Type..."
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["userType"]}
                    />
                    <Input
                        name="typeId" 
                        label="Teacher Id"
                        type="text" 
                        placeholder="Type Id..."
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["typeId"]}
                    />

                    <div>
                        <p>{this.state.errors['signup']}</p>
                        <input className='button button-edit' id="Add-button" type="submit" value="Sign up"/>
                    </div>
                </form>
            </div>
        )   
    }
}



export default withRouter(Signup);