import React, {Component} from 'react';
import Input from "../Input"

import {withRouter} from 'react-router-dom'

class Auth extends Component{

    state = {
        fields:{},
        errors:{},
    };

    componentDidMount(){
        
    }
    
    submit = (e)=>{
      e.preventDefault();
      if(this.validateForm()){
          fetch('http://192.168.1.5:3001/user/signin',{
              method:'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.fields) 
          })
          .then(res=>res.json())
          .then(res=>{
            if(res.error){
                const errors = {...this.state.errors,signin:'Authentification failed'};
                this.setState({
                    errors  
                });
            }else{
                if(res.token){
                    localStorage.setItem('token',res.token);
                    this.props.history.push('/student');
                }
            }
          })
          .catch(err=>{
            console.log(err);
          });
      }
    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["userName","password"];
        const errors=this.state.errors;
        
        fieldNames.forEach(fieldName=>{
            if( !fields[fieldName] ){
                errors[fieldName]= fieldName+" is required";
            }
        });

        delete errors['signin'];

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
        // function validateuserName(userName) {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(userName).toLowerCase());
        // }
        // switch (fieldName){
        //     case "userName":
        //         if(fieldValue.length!==0) {
        //             errors[fieldName]="Not a valid userName"
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
                { this.props.location.state &&
                <div>
                    <h1>You must Sign in to view this page</h1>
                </div>
                }
                
                <h1>Sign in</h1>
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
                    <div>
                        <p>{this.state.errors['signin']}</p>
                        <input className='ino_button' id="Add-button" type="submit" value="Sign"/>
                    </div>
                </form>
            </div>
        )   
    }
}



export default withRouter(Auth);