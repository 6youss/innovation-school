import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import StudentsList from './components/StudentsList'
import Student from './components/Student'

class App extends Component {


  
  render() {

    return (
      
        <BrowserRouter>
            <div>
              <Header/>
                <main>
                  <Route exact path={"/"} component = {Home} />
                  <Route exact path={"/student"} component = {StudentsList}/>
                  <Route exact path={"/student/:id"} component = {Student}/>
                  <Route exact path={"/teacher"} component = {StudentsList}/>
                </main>
              <Footer/>
            </div>
        </BrowserRouter>

      
    );
  }
}

export default App;
