import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';

import Modal from '../Modal'

import PaymentsList from '../payment/PaymentsList';
import GroupsList from '../group/GroupsList';
import SessionsList from '../session/SessionsList';
import AddBill from '../bill/AddBill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PrivateRoute from '../PrivateRoute'
import EditStudent from './EditStudent'

class StudentDetails extends Component {

    state = {
        student:{},
        payments:[],
        groups:[],
        sessions:[],
        selectedPayments:[],
        addBill:false,
        studentDeleted:false,
    }

    studentId = this.props.match.params.id;

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        if(this.props.history.action ==="POP"){
            this.getData();
        }
    }

    getData=()=>{
        fetch("http://192.168.1.5:3001/student/"+this.studentId)
        .then( res => res.json())
        .then(json=>{
            if(json.student.length>0)
                this.setState({
                    student : json.student[0]
                });
        });

        fetch("http://192.168.1.5:3001/student/"+this.studentId+"/payments")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                payments : json.payments
            });
        });

        fetch("http://192.168.1.5:3001/student/"+this.studentId+"/groups")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                groups : json.groups
            });
        });

        fetch("http://192.168.1.5:3001/student/"+this.studentId+"/sessions")
        .then( res => res.json())
        .then(json=>{
            this.setState({
                sessions : json.sessions
            });
        });
    }

    deleteStudent=()=>{
        var result = window.confirm("Do you really want to delete this student?");
        if (result) {
            fetch("http://192.168.1.5:3001/student/"+this.studentId, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json=>{
                if(!json.error){
                    this.props.history.goBack();
                }else{
                    console.log(json.error);
                } 
            });
        }
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
        console.log(this.props);
        const {
               firstName, 
               lastName,
               sex, 
               picture, 
               birthday, 
               adress, 
               phone, 
               parentPhone, 
               inscriptionDate
            } = this.state.student;
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
                        <img className ="student-picture student-pic"
                            src={`http://192.168.1.5:3001/uploads/${picture}`}
                            alt={"Student Avatar"}
                            onError={(e)=>{e.target.src=sex?"/default-avatar.png":"/default-avatar-female.png"}}
                        /> 
                        <div className ="student-props">
                            <h1>{firstName} {lastName}</h1>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='address-book'/>
                                <strong>Adress:</strong> {adress}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='sign-in-alt'/>
                                <strong>Inscription date:</strong> {inscriptionDate}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='birthday-cake'/>
                                <strong>Birthday:</strong> {birthday}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='phone'/>
                                <strong>Phone Number:</strong> {phone}
                            </p>
                            <p>
                                <FontAwesomeIcon className='button-icon' icon='user-tie'/>
                                <strong>Parent Number:</strong> {parentPhone}
                            </p>
                        </div>
                        <div className ="buttons">
                            <button onClick={()=>{this.props.history.push('/student/'+this.studentId+'/edit')}} className="button button-edit">
                                <FontAwesomeIcon className='button-icon' icon="edit"/>Edit
                            </button>
                            <p/>
                            <button onClick={this.deleteStudent} className="button button-delete">
                                <FontAwesomeIcon className='button-icon' icon="trash-alt"/>Delete
                            </button>
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
                {
                    this.props.history.action==="PUSH" &&
                    <PrivateRoute rights={[0,1]} path={"/student/:id/edit"} component ={EditStudent} update={this.getData}/>
                }
                
            </Modal>
        )
    }

}

export default StudentDetails;