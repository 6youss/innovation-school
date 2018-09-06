import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'

import Student from './components/student/Student'
import StudentDetails from './components/student/StudentDetails'

import TeachersList from './components/teacher/TeachersList'

import Module from './components/module/AddModule'

import Group from './components/group/Group'
import GroupDetails from './components/group/GroupDetails'

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
                  <Route exact path={"/module"} component = {Module}/>
                </main>
              <Footer/>
            </div>
        </BrowserRouter>

      
    );
  }
}

export default App;
