import React, { Component } from 'react';
import { 
        BrowserRouter,
        Route,
        Redirect,
        Switch,
       } from 'react-router-dom';



/** DESIGN */
import './App.css';
import './components/Header.css';

//student
import './components/student/Student.css';
import './components/student/AddStudent.css';
import './components/student/StudentsList.css';
import './components/student/StudentDetails.css';

//group
import './components/group/AddGroup.css';
import './components/group/GroupDetails.css';
import './components/group/AddGroupStudents.css';

//bill
import './components/bill/AddBill.css';

//module
import './components/module/AddModule.css';

//room
import './components/room/AddRoom.css';


/** COMPONENTS */
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/auth/Auth'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'

import Student from './components/student/Student'
import StudentDetails from './components/student/StudentDetails'

import Teacher from './components/teacher/Teacher'

import Module from './components/module/AddModule'
import Room from './components/room/AddRoom'

import Group from './components/group/Group'
import GroupDetails from './components/group/GroupDetails'

import SessionDetails from './components/session/SessionDetails'

import Payment from './components/payment/Payment'
import PaymentDetails from './components/payment/PaymentDetails'

import checkAuth from './components/HOC/checkAuth'

class App extends Component {

  render() {
    console.log('rendering App');
    return (
        <BrowserRouter>
            <div>
              <Header/>
              <div className='main'>
                <PrivateRoute exact path={"/"} component = {Home} />
                <Route path={"/signin"} component = {Auth}/>
                <Route path={"/signup"} component = {Signup}/>
                <Route path={"/logout"} component = {Logout}/>
                <PrivateRoute rights={['teacher']} path={"/student"} component = {Student}/>
                <PrivateRoute exact path={"/student/:id"} component = {StudentDetails}/>
                <PrivateRoute exact path={"/teacher"} component = {Teacher}/>
                <PrivateRoute path={"/group"} component = {Group}/>
                <PrivateRoute exact path={"/group/:id"} component = {GroupDetails}/>
                <PrivateRoute exact path={"/session/:id"} component = {SessionDetails}/>
                <PrivateRoute exact path={"/module"} component = {Module}/>
                <PrivateRoute exact path={"/room"} component = {Room}/>
                <PrivateRoute exact path={"/payment/:id"} component = {PaymentDetails}/>
                <PrivateRoute exact path={"/payment"} component = {Payment}/>              
              </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;


const PrivateRoute = ({ component: Component,rights, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth(rights) ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
};