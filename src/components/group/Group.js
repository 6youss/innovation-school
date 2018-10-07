import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import GroupsList from './GroupsList'

import {CSSTransition} from 'react-transition-group';
import AddGroup from './AddGroup'


class Group extends Component {
    
    initialGroups;
    state = {
        groups : [],
        searchInput:"",
        newGroup:false
    }
    
    componentDidMount(){
        this.getGroups();
    }

    getGroups(){
        fetch("http://localhost:3001/group")
        .then( res => res.json())
        .then(json=>{
          this.setState({
            groups : json.groups
          });
          this.initialgroups=json.groups;
        });
    }


    
    onChangeHandler(e){
        this.setState({
            searchInput: e.target.value,
        });
    }
    
    addGroup = ()=>{
        this.setState({
            newGroup: !this.state.newGroup    
        });
    }

    Group = ({groupId,moduleId,level})=>{
        return (
            <NavLink to={`/group/${groupId}`}>
            <li className="big">
                <div className="img">{groupId}</div>
                <div className="center"><p>{moduleId}</p></div>
                <div className="left"><p>{level}</p></div>
            </li>
            </NavLink>
        )
    }
    
    render(){

        const list = this.state.groups
        .filter(group => this.state.searchInput === ''
                || ( (group.moduleId+" "+group.groupId).indexOf(this.state.searchInput) !== -1) )
        
        return (
            <div>
                <div className="StudentsHeader">
                    <div className="StudentsHeader">
                        <h1 style={{margin:'0 30px 0 0'}}>Groups</h1>
                        <p onClick={this.addGroup} > Add group </p>
                    </div>
                    <input
                        type="text" 
                        placeholder="Search.." 
                        className="search" 
                        onChange={this.onChangeHandler.bind(this)}
                    />
                </div>

                <CSSTransition
                    key={3}
                    in={this.state.newGroup}
                    appear={true}
                    timeout={300}
                    classNames='drop-down'
                    unmountOnExit
                >
                    <AddGroup updateGroups = {this.getGroups.bind(this)} />
                </CSSTransition>
                
                <GroupsList
                    groups={list}
                />
            </div>
        )

    }

}

export default Group;