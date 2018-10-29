import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group';

import Modal from '../Modal'

import PaymentsList from '../payment/PaymentsList';
import GroupsList from '../group/GroupsList';
import SessionsList from '../session/SessionsList';
import AddBill from '../bill/AddBill';

class StudentDetails extends Component {

    state = {
        student:{firstName:'',lastName:'',picture:''},
        payments:[],
        groups:[],
        sessions:[],
        selectedPayments:[],
        addBill:false
    }

    studentId = this.props.match.params.id;
    
    componentDidMount(){
        console.log(this.props);
        fetch("http://localhost:3001/student/"+this.studentId)
        .then( res => res.json())
        .then(json=>{
            if(json.student.length>0)
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

    addBill=()=>{
        const scrollUp = setInterval(()=>{
            if(this.detailsContainer.scrollTop > 0){
                this.detailsContainer.scrollTop-=this.detailsContainer.scrollTop/5;
            }else{
                clearInterval(scrollUp);
            }
        },0);
        this.setState({
            addBill:true
        });
    }
    cancelBill(){
        this.setState({
            addBill:false
        });
    }
    render(){
        
        const {firstName,lastName,picture} = this.state.student;
        return (
            <Modal modalId={'studentId'} closeMe={this.props.history.goBack}>
            
                <CSSTransition
                        key={2}
                        in={true}
                        appear={true}
                        classNames='student-details'
                        timeout={200}
                        unmountOnExit
                >
                <div className="student-details" ref={ref=>this.detailsContainer=ref}>
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
                                <button onClick={this.addBill} className='ino_button validate'>
                                    Pay
                                </button>
                            }
                        </div>
                        
                    </div>
                    
                </div>
                </CSSTransition>
                <CSSTransition
                        key={1}
                        in={this.state.addBill}
                        classNames='bill-container'
                        timeout={200}
                        unmountOnExit
                >
                        <AddBill
                            payments={this.state.selectedPayments}
                            cancelBill={this.cancelBill.bind(this)}
                        />
                </CSSTransition>
            </Modal>
        )
    }

}

export default withRouter( StudentDetails);