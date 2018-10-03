import React, {Component} from 'react';

class AddBill extends Component {

    state = {
        
    }

    componentDidMount(){
        this.getPdf(this.props.payments);
    }

    getPdf(payments){
        fetch('http://localhost:3001/bill',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                payments:this.props.payments,
                validated:false
            }),
            responseType: 'blob'
        })
        .then(res=>{
            return res.blob();
        })
        .then(res=>{
            var url = window.URL.createObjectURL(res);
            this.frame.src=url;
        })
        .catch(res=>{
            console.log(res);
        });
    }

    validateDoc=()=>{
        fetch('http://localhost:3001/bill',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                payments:this.props.payments,
                validated:true
            })
        })
        .then(res=>{
            return res.blob();
        })
        .then(res=>{
            var url = window.URL.createObjectURL(res);
            this.frame.src=url;
        })
        .catch(res=>{
            console.log(res);
        });
    }

    render(){
        
        return (
            <div>
                <iframe title='bill' ref={frame=>this.frame=frame}/>
                <button onClick={this.validateDoc}>
                    Validate
                </button>
            </div>
        )
    }

}

export default AddBill;