import React, {Component} from 'react';
import Input from "../Input"

class AddModule extends Component{

    state = {
        fields:{},
        errors:{}
    };
    input;

    componentDidMount(){
        this.input = document.getElementById("fileInput");
    }
    
    uploadPicture = (e) =>{

        const avatar = document.getElementById("ModulePicture");
        
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
            
            const url = "http://192.168.1.5:3001/module/";
    
            return  fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(json=>{
                        //this.props.updateModules();
                        console.log("Added Module: "+ json);
                    });
        }

    }

    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["moduleName"];
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
            case "moduleName":
                if(fieldValue.length!==0 && fieldValue.length<5) {
                    errors[fieldName]="Module name must be longer then 5 letters"
                }
            break; 
            default:
            break;
        }
        this.setState({fields,errors});
    }

    render(){
        
        return (
            <div className='add-module-container'>
                <h1>Add Module</h1>
                <div className="add-module">
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

                    <div className='module-input'>
                        <Input 
                            name="moduleName" 
                            label="Module Name" 
                            type="text" 
                            placeholder="Module Name..." 
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["moduleName"]}
                        />
                        <input className='button button-edit' id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                    </div>
                    
                    <input id="fileInput" type="file" accept="image/*" style={{display:"none"}} onChange={this.uploadPicture}/>
                </div>
            </div>
        )   
    }
}



export default AddModule;