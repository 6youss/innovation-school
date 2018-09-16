import React, {Component} from 'react';



class Home extends Component {

    componentDidMount(){
        fetch(`http://localhost:3001/checkpayments`)
        .then(result=>result.json())
        .then(result=>{
            
            const newinfo ={};
            const newpaid ={};

            result.paid.forEach(paid=>{
                newpaid[paid.studentId]=paid;
            });
            
            result.info.forEach(info=>{
                newinfo[info.studentId]=info;
            });
            
            Object.keys(newinfo).forEach((key,index) =>{
                
                const {studentId,
                        groupId,
                        sessionCount,
                        paymentPrice,
                        sessionsDoneCount
                        } = newinfo[key];
                
                const {sessionsPaidCount,dayDiff}=newpaid[key];

                const payment = JSON.stringify(
                    {
                        studentId,
                        groupId,
                        paymentPrice: parseInt(paymentPrice,10)*
                                      parseInt(sessionCount,10)
                    }
                );
                
                if(sessionCount>1){//this means that the payment is not per month
                    //if student studied more then he paid we add a payment
                    if(sessionsDoneCount>=sessionsPaidCount){
                        this.addPayment(payment);
                    }
                }else{
                    //month sessions
                    if( dayDiff >= 30*sessionsPaidCount){
                        this.addPayment(payment);
                    }
                }
            });
        })
    }

    addPayment(payment){
        fetch(`http://localhost:3001/payment/`,
        {
            method: "POST",        
            headers:{
                'Content-Type': 'application/json'
            },
            body: payment
        }).then(response => response.json())
        .then(response => console.log(response));
    }

    render(){     
        return (
            
                <div className="Home">
                    <h1>Home</h1>
                </div>

        )   
    }

}

export default Home;