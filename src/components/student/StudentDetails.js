import React, {Component} from 'react';

import PaymentsList from '../payment/PaymentsList';
import GroupsList from '../group/GroupsList';
import SessionsList from '../session/SessionsList';
import AddBill from '../bill/AddBill';

class StudentDetails extends Component {

    state = {
        payments:[],
        groups:[],
        sessions:[],
        selectedPayments:[],
        addBill:false
    }

    studentId = this.props.student.studentId;
    student = this.props.student;

    componentDidMount(){
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
        const {firstName,lastName,picture} = this.props.student;
        return (
            <div className='modal-container' onClick={this.props.handleClick}>
                <div className="student-details">
                    <div className='details-row-container1'>
                        <img className ="student-picture"
                            src={`http://localhost:3001/uploads/${picture}`}
                            alt={"Student Avatar"}
                            onError={(e)=>{e.target.src="../default-avatar.png"}}
                        />
                        <div className ="student-props">
                            <h1>{firstName} {lastName}</h1>
                            <p>Inscription date: 01/01/19</p>
                            <p>Birthday: 01/01/19</p>
                            <p>Phone Number: </p>
                            <p>Adress: </p>
                            <p>Parent Number: </p>
                        </div>
                        <div>
                            <p>edit</p>
                            <p>delete</p>
                        </div>
                    </div>
                    <div className='details-row-container2'>
                        <div>
                            <h3>Groups</h3>
                            <GroupsList
                                groups={this.state.groups}
                            />
                        </div>
                        <div>
                            <h3>Sessions</h3>
                            <SessionsList
                                sessions={this.state.sessions}
                            />
                        </div>
                        <div>
                            <h3>Payments</h3>
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
                        </div>
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