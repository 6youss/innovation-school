import React, {Component} from 'react';



class DropItems extends Component {

    state = {
      items:[],
      drop:false
    }

    dropItems=()=>{
      this.setState({
        drop:!this.state.drop
      });
    }


    render(){
      
      return (
        <div>
          <div className="list-item" onClick={this.dropItems}>
            <div><p>{this.props.name}</p></div>
            <div><p>></p></div>
          </div>
          { this.state.drop &&
            this.props.children 
          }
        </div>
      )   
    }

}

export default DropItems;