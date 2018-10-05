import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import './components/student/Student.css';
import './components/student/AddStudent.css';
import './components/student/StudentsList.css';
import './components/student/StudentDetails.css';


import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'

import Student from './components/student/Student'
import StudentDetails from './components/student/StudentDetails'

import TeachersList from './components/teacher/TeachersList'

import Module from './components/module/AddModule'
import Room from './components/room/AddRoom'

import Group from './components/group/Group'
import GroupDetails from './components/group/GroupDetails'

import SessionDetails from './components/session/SessionDetails'

import Payment from './components/payment/Payment'
import PaymentDetails from './components/payment/PaymentDetails'

class App extends Component {


  
  render() {

    return (
      
        <BrowserRouter>
            <div>
              <Header/>
                <main>
                  <Route exact path={"/"} component = {Home} />
                  <Route exact path={"/student"} component = {Student}/>
                  <Route exact path={"/student/:id"} component = {StudentDetails}/>
                  <Route exact path={"/teacher"} component = {TeachersList}/>
                  <Route exact path={"/group"} component = {Group}/>
                  <Route exact path={"/group/:id"} component = {GroupDetails}/>
                  <Route exact path={"/session/:id"} component = {SessionDetails}/>
                  <Route exact path={"/module"} component = {Module}/>
                  <Route exact path={"/room"} component = {Room}/>
                  <Route exact path={"/payment/:id"} component = {PaymentDetails}/>
                  <Route exact path={"/payment"} component = {Payment}/>
                </main>
              <Footer/>
            </div>
        </BrowserRouter>

      
    );
  }
}

export default App;
