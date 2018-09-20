import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'
import ListHeader from '../ListHeader';
import PaymentsList from '../payment/PaymentsList';
import GroupsList from '../group/GroupsList';
import SessionsList from '../session/SessionsList';
import AddBill from '../bill/AddBill';

class StudentDetails extends Component {

    state = {
        student : [],
        payments:[],
        groups:[],
        sessions:[],
        selectedPayments:[],
        addBill:false
    }

    studentId = this.props.match.params.id;

    componentDidMount(){
        fetch("http://localhost:3001/student/"+this.studentId)
        .then( res => res.json())
        .then(json=>{
            this.setState({
                student : json.student[0]
            });
        });
        
        fetch("http://localhost:3001/student/"+this.studentId+"/payments")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                payments : json.payments
            });
        });

        fetch("http://localhost:3001/student/"+this.studentId+"/groups")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                groups : json.groups
            });
        });

        fetch("http://localhost:3001/student/"+this.studentId+"/sessions")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                sessions : json.sessions
            });
        });
    }

    handleSelect(payment){

        let selectedPayments = this.state.selectedPayments;
        let paymentIndex = selectedPayments.findIndex(selected=>selected.paymentId===payment.paymentId);
        
        if(paymentIndex === -1){
            selectedPayments.push(payment);
        }else{
            selectedPayments.splice(paymentIndex,1);
        }
        
        this.setState({selectedPayments});
        
    }



    render(){

        const {firstName,lastName,picture} = this.state.student;
        
        return (
            <div>
            <div className="StudentDetails">
                <div style={{float:"right"}}>
                    <p>edit</p>
                    <p>delete</p>
                </div>

                <aside className="PictureContainer">
                    <img className ="StudentPicture" 
                        src={(picture)?`http://localhost:3001/uploads/${picture}`: "../default-avatar.png" }
                        alt={"Student Avatar"}
                    />
                </aside>

                <div className="StudentInfo">
                    <h1>{firstName} {lastName}</h1>
                    <p>Inscription date: 01/01/19</p>
                    <p>Birthday: 01/01/19</p>
                    <p>Phone Number: </p>
                    <p>Parent Number: </p>
                </div>

            </div>
            <div className="StudentDetails">
                <ListHeader title="Groups" />
                <GroupsList
                    groups={this.state.groups}
                />
                <div>
                <ListHeader title="Sessions" />
                <SessionsList
                    sessions={this.state.sessions}
                />
                </div>
                <div>
                    <ListHeader title="Payments" icons="Add"/>
                    <PaymentsList
                        payments={this.state.payments}
                        selectedPayments={this.state.selectedPayments}
                        handleSelect = {this.handleSelect.bind(this)}
                    />
                    {this.state.selectedPayments.length>0 &&
                        <button onClick={()=>this.setState({addBill:!this.state.addBill})}>
                            Pay
                        </button>
                    }
                    
                    {this.state.addBill &&
                        <AddBill
                            payments={this.state.selectedPayments}
                        />
                    }
                </div>
            </div>
            </div>
        )
    }

}

export default StudentDetails;