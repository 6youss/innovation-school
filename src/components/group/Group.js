import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Group.css'
import GroupsList from './GroupsList'
import AddGroup from './AddGroup'

class Group extends Component {
    
    initialGroups;
    state = {
        groups : [],
        searchInput:"",
        newGroup:true
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
            { this.state.newGroup && <AddGroup updateGroups = {this.getGroups.bind(this)} />}
            <ul className="groupList">
                <div className="groupsHeader">
                    <h1>Groups</h1>
                    <p onClick={this.addGroup} > Add group </p>
                    <input type="text" placeholder="Search.." className="Input" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <GroupsList
                    groups={list}
                />
            </ul>
            </div>
        )

    }

}

export default Group;