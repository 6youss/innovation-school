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
            console.log(newinfo,newpaid);
/*
    //sessionCount > 0
    1-count the sessions done for each student
    if the (sessionCount % info.sessionCount === 0) then there's a new payment

        for doing that : 
            - we should estimate how much his payments are worth 
                by converting their price to sessions
            - if the (sessionCount > worthOfPayment) && the condition mentioned above
                then we can generate a new payment
                
*/
        })
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