import React from 'react';
import {NavLink} from 'react-router-dom'

const PaymentsList = ({payments,selectedPayments,handleSelect}) => {
    
    const PaymentItem = ({payment,select,selected})=>{
        const {paymentId,paymentPrice,paymentDone,groupId,paymentDate} = payment;
        return (
                <li className={(selected)?"bigSelected":"big"} onClick={select.bind(this,payment)} >
                    <div className="img">
                        <p>Group: {groupId} {paymentDate} </p>
                    </div>
                    <div className="center">
                        <p>{paymentPrice} DA</p>
                    </div>
                    <div className="left">
                        <p>{paymentDone?"Paid":"Not Paid"}</p>
                    </div>
                </li>
        )   
    }

    const list = payments
                .map(payment => {
                    return <PaymentItem 
                        key={payment.paymentId}
                        payment={payment}
                        select={handleSelect}
                        selected={selectedPayments.findIndex(selected=>selected.paymentId===payment.paymentId)!==-1}
                    />
                });

    return (
        (list.length>0)? list : <p>"Can't find any payments..."</p>
    )
} 
export default PaymentsList;