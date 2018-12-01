import React, { Component } from 'react';
import { 
        BrowserRouter,
        Route,
        Switch,
       } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'

/** DESIGN */
import './App.css';
import './components/Header.css';
import './components/Buttons.css';
//student
import './components/student/Student.css';
import './components/student/AddStudent.css';
import './components/student/StudentsList.css';
import './components/student/StudentDetails.css';
//group
import './components/group/AddGroup.css';
import './components/group/GroupDetails.css';
import './components/group/AddGroupStudents.css';
import './components/group/AddGroupSessions.css';
//bill
import './components/bill/AddBill.css';
//module
import './components/module/AddModule.css';
//room
import './components/room/AddRoom.css';
//Modal
import './components/Modal.css';

/** COMPONENTS */
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Auth from './components/auth/Auth'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'


import Student from './components/student/Student'
//import StudentDetails from './components/student/StudentDetails'

import Teacher from './components/teacher/Teacher'

import Module from './components/module/AddModule'
import Room from './components/room/AddRoom'

import Group from './components/group/Group'
//import GroupDetails from './components/group/GroupDetails'

import SessionDetails from './components/session/SessionDetails'

import Payment from './components/payment/Payment'
import PaymentDetails from './components/payment/PaymentDetails'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt,faEdit,faAddressBook,faSignInAlt,faBirthdayCake,faPhone,faUserTie,faUserPlus} 
       from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt,faEdit,faAddressBook,faSignInAlt,faBirthdayCake,faPhone,faUserTie,faUserPlus);

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <div>
              <Header/>
              <div className='main'>
              <Switch>
                <Route path={"/signin"} component = {Auth}/>
                <Route path={"/signup"} component = {Signup}/>
                <Route path={"/logout"} component = {Logout}/>
                <PrivateRoute rights={[0,1]} exact path={"/"} component = {Home} />
                <PrivateRoute rights={[0,1]} path={"/student"} component = {Student}/>
                <PrivateRoute rights={[0,1]} path={"/teacher"} component = {Teacher}/>
                <PrivateRoute rights={[0,1]} path={"/group"} component = {Group}/>
                <PrivateRoute rights={[0,1]} exact path={"/session/:id"} component = {SessionDetails}/>
                <PrivateRoute rights={[0,1]} exact path={"/module"} component = {Module}/>
                <PrivateRoute rights={[0,1]} exact path={"/room"} component = {Room}/>
                <PrivateRoute rights={[0,1]} exact path={"/payment/:id"} component = {PaymentDetails}/>
                <PrivateRoute rights={[0,1]} exact path={"/payment"} component = {Payment}/>  
                <Route component = {NotFound}/>
              </Switch>
              </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
