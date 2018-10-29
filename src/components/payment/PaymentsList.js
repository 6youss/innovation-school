import React from 'react';

const PaymentsList = ({payments,selectedPayments,handleSelect}) => {
    
    const PaymentItem = ({payment,select,selected})=>{
        const {paymentPrice,paymentDone,groupId,paymentDate} = payment;
        return (
                <li className={(selected)?"list-item selected":'list-item'} onClick={select.bind(this,payment)} >
                    <div>
                        <p>Group {groupId}</p>
                    </div>                    
                    <div>
                        <p>{paymentDate+' '+paymentDone}</p>
                    </div>
                    <div>
                        <p>{paymentPrice} DA</p>
                    </div>
                </li>
        )   
    }

    const list =<div className='list'> 
                {
                    payments.map(payment => {
                        return <PaymentItem 
                            key={payment.paymentId}
                            payment={payment}
                            select={handleSelect}
                            selected={selectedPayments.findIndex(selected=>selected.paymentId===payment.paymentId)!==-1}
                        />
                    })
                }
                </div>;

    return (
        (payments.length>0)? list : <p>"Can't find any payments..."</p>
    )
}

export default PaymentsList;