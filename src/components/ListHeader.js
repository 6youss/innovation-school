import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Student.css'


const ListHeader = ({title,icons})=>{

    const headerStyle ={
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    titleStyle={

    },
    iconStyle={
        float:"right",
        margin:"0px 0px 0px 20px"
    }
    
    return (
        <div className="StudentInfo">
            <div className="Header" style={headerStyle}>
                <h3 style={titleStyle}>{title}</h3>
                { icons && <p style={iconStyle}>{icons}</p>}
            </div>
        </div>
    )   
}

export default ListHeader;