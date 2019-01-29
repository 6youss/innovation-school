import React, {Component} from 'react';

import AddModule from './AddModule'
import ModulesList from './ModulesList';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Module extends Component {
    
    initialModules;
    
    state = {
        modules : [],
        searchInput:"",
        newModule:false,
    }
    
    componentDidMount(){
        this.getModules();
    }

    componentWillReceiveProps(){
        this.getModules();
    }

    getModules(){
        fetch(`${process.env.REACT_APP_SERVER_URL}/module`)
        .then( res => res.json())
        .then(json=>{
          this.setState({
            modules : json.modules
          });
          this.initialModules=json.modules;
        });   
    }

    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    addModule = ()=>{
        this.setState({
            newModule: !this.state.newModule    
        });
    }

    render(){
        const list = this.state.modules
        .filter(module => this.state.searchInput === '' 
                || ( (module.moduleName).indexOf(this.state.searchInput) !== -1) );
        
        return (
            <div style={{width:'100%'}}>
            
                { this.state.newModule && 
                    <AddModule 
                        updateModules = {this.getModules.bind(this)}
                        addModule = {this.addModule.bind(this)}
                    />
                }
                <div className="ModulesHeader">
                    <div className="ModulesHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Modules</h1>
                        <p className='title-icon' onClick={this.addModule}>
                            <FontAwesomeIcon icon='user-plus'/>
                        </p>
                    </div>
                    <input 
                        className="search" 
                        type="text" 
                        placeholder="Search.." 
                        onChange={this.onChangeHandler.bind(this)}
                    />
                </div>
                <ul className="list">
                    <ModulesList modules={list} handleDetails={this.handleDetails.bind(this)}/>
                </ul>

            </div>
        );
    }

}
export default Module;