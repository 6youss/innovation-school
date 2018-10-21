import React, {Component} from 'react';

class AddBill extends Component {

    state = {
        validated:false
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
            this.setState({
                validated:true
            })
        })
        .catch(res=>{
            console.log(res);
        });
    }

    render(){
        return (
            <div 
                className='bill-container' 
            >
                <iframe title='bill' ref={frame=>this.frame=frame}/>
                <div>
                    <button className='ino_button cancel' onClick={this.props.cancelBill}>
                        Close
                    </button>
                    <button 
                        onClick={()=>{this.validateDoc();}}
                        className='ino_button validate'
                        enable={!this.state.validated}
                    >
                        { this.state.validated?'Bill Validated !':'Validate' }
                    </button>
                </div>
            </div>
        )
    }

}

export default AddBill;