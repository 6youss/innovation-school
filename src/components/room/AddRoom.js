import React, {Component} from 'react';

import Input from "../Input"

class AddRoom extends Component{

    state = {
        fields:{},
        errors:{}
    };

    componentDidMount(){
        
    }
    

    submit = ()=>{
        if(this.validateForm()){

            fetch(`${process.env.REACT_APP_SERVER_URL}/room/${this.state.fields["roomId"]}`)
            .then(res=>res.json())
            .then(json=>{                
                if(json.room.length>0){
                    this.setState({
                        errors:{
                            roomId:`Room ${this.state.fields["roomId"]} allready exists`,
                            ...this.state.errors
                        }
                    });
                }else{
                    const room=JSON.stringify({
                        roomId: this.state.fields["roomId"],
                        places: this.state.fields["places"],
                    });
            
                    fetch(`${process.env.REACT_APP_SERVER_URL}/room/`, 
                    {
                        method: "POST",        
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: room
                    })
                    .then(response => response.json())
                    .then(json=>{
                        console.log(json);
                    });
                }
            });
            
            
        }
    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["roomId","places"];
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

        var regex = /^[0-9]*$/gm;

        switch (fieldName){
            case "roomId":
                if(fieldValue.length!==0 && !regex.test(fieldValue)) {
                    errors[fieldName]="Room number must be a number"
                    event.target.value ="";
                }
            break; 
            case "places":
                if(fieldValue.length!==0 && !regex.test(fieldValue)) {
                    errors[fieldName]="Room places must be a number";
                    event.target.value ="";
                }
            break;  
            default:
            break;
        }
        this.setState({fields,errors});
    }

    render(){
        
        return (
            <div className="add-room-container">
                <h1>Add Room</h1>
                <div className='add-room-input'>
                    <Input 
                        name="roomId"
                        label="Room Number"
                        type="text"
                        placeholder="Room Number..."
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["roomId"]}
                    />
                    <Input 
                        name="places" 
                        label="Room Places"
                        type="text" 
                        placeholder="Room Places..." 
                        handlechange={this.handleChange.bind(this)}
                        error={this.state.errors["places"]}
                    />
                    <input className='button button-edit' id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                </div>
                
            </div>
        )   
    }
}



export default AddRoom;