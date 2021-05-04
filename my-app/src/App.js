import logo from './logo.svg';
import './App.css';
import React from "react";

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'; 
import SignUp_page from './SignUp_page/SignUp_page';
import Login_page from './Login_page/Login_page';
import Home_pageJS from './Home_pageJS/Home_page';
function App() {
    return ( 
        <Router>
          <Route exact path="/Home" component={Home_pageJS}/>
          <Route exact path="/Login_page" component={Login_page}/>
          <Route exact path="/SignUp_page" component={SignUp_page}/>
        </Router>
    );
}

export default App;