import React, {Component} from 'react';

import Input from "../Input"
import StudentsList from '../student/StudentsList';

class AddGroupStudents extends Component{

    state = {
        students:[],
        selectedStudents:[],
        fields:{},
        errors:{}
    };


    componentDidMount(){

    }

    componentDidUpdate(prevProps){
        if(this.state.students.length === 0 ||
            this.props.currentStudents.length !==  prevProps.currentStudents.length){
                this.getOtherStudents();
        }
    }

    getOtherStudents(){
        
        fetch("http://localhost:3001/group/"+this.props.group.groupId+"/students")
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                students: json.otherStudents
            });
        });
        

    }

    submit = ()=>{
        if(this.validateForm()){
            const groupId = this.props.group.groupId;
            this.state.selectedStudents.forEach(
                studentId=>{
                    const student = JSON.stringify(
                                        this.state.students
                                        .find( student => student.studentId === studentId )
                                    );
                    
                    //add the student to this group
                    const addstudent=fetch(`http://localhost:3001/group/${groupId}/${studentId}`, 
                                    {
                                        method: "POST",        
                                        headers:{
                                            'Content-Type': 'application/json'
                                        },
                                        body: student
                                    }).then(response => response.json());
                    
                    //add his payment info now
                    const paymentInfo = JSON.stringify(
                        {
                            studentId: studentId,
                            groupId: groupId,
                            sessionCount: this.state.fields["sessionCount"],
                            paymentPrice: this.state.fields["paymentPrice"]
                        }
                    );
                    const addpaymentinfo=fetch(`http://localhost:3001/payment/info`, 
                                        {
                                            method: "POST",        
                                            headers:{
                                                'Content-Type': 'application/json'
                                            },
                                            body: paymentInfo
                                        }).then(response => response.json());
                    //now we generate the payment
                    const payment = JSON.stringify(
                        {
                            studentId: studentId,
                            groupId: groupId,
                            paymentPrice: parseInt(this.state.fields["paymentPrice"],10)*
                                          parseInt(this.state.fields["sessionCount"],10)
                        }
                    );
                    const addpayment=fetch(`http://localhost:3001/payment/`, 
                                    {
                                        method: "POST",        
                                        headers:{
                                            'Content-Type': 'application/json'
                                        },
                                        body: payment
                                    }).then(response => response.json());
                    
                    Promise.all([addstudent,addpaymentinfo,addpayment])
                    .then(([addstudent,addpaymentinfo,addpayment])=>{

                        this.props.updateStudents();
                        this.setState({
                            selectedStudents:[]
                        });

                    });

                }
            )   
        }
    }


    validateForm(){
        
        let fields = this.state.fields;
        
        const fieldNames = ["paymentPrice"];
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
            case "paymentPrice":
                if(fieldValue.length!==0 && !regex.test(fieldValue)) {
                    errors[fieldName]="Price is a number"
                    event.target.value ="";
                }
            break; 
            case "sessionCount":
                if(fieldValue.length!==0 && !regex.test(fieldValue)) {
                    errors[fieldName]="Session count in a number";
                    event.target.value ="";
                }
            break;  
            default:
            break;
        }
        this.setState({fields,errors});
    }

    handleSelect(studentId){

        let selectedStudents = this.state.selectedStudents;
        let studentIndex = selectedStudents.indexOf(studentId);
        
        if(studentIndex === -1){
            selectedStudents.push(studentId);
        }else{
            selectedStudents.splice(studentIndex,1);
        }
        console.log(selectedStudents);
        
        this.setState({selectedStudents});
    }

    render(){
        
        return (
            <div>
                <div >
                    <h1>Payment info</h1>
                    <div>
                        <Input 
                            name="paymentPrice" 
                            label="Price/(session|month)"
                            type="text" 
                            placeholder="Price..."
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["paymentPrice"]}
                        />
                        <Input 
                            name="sessionCount" 
                            label="Number of sessions (0 for month payment)" 
                            type="text" 
                            placeholder="Number of sessions to get paid..."
                            handlechange={this.handleChange.bind(this)}
                            error={this.state.errors["sessionCount"]}
                        />
                        <StudentsList 
                            students={this.state.students}
                            selectedStudents={this.state.selectedStudents}
                            handleSelect = {this.handleSelect.bind(this)}
                        />
                        <input id="Add-button" type="submit" value="Add" onClick={this.submit}/>
                    </div>
                </div>
            </div>
        )   
    }
}

export default AddGroupStudents;