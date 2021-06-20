//import logo from './logo.svg';
import './App.css';
import React from "react";

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 
import SignUp_page from './SignUp_page/SignUp_page';
import Login_page from './Login_page/Login_page';
import Home_pageJS from './Home_pageJS/Home_page';
import Orders from './components/Orders_page/Orders';
import Customer from './components/Customer_page/Customer';
//import Header_auth from './components/Header_auth';
import Element from './components/Element__page/Element'
import Footer from './components/Footer';
import Purchase from './components/Purchase__page/Purchase';
import Product__page from './components/Product_page/Product__page';

function App() {
    return ( 
<Router>
      <div>

        
        <Switch>

          <Route key="homepage" exact path="/" component={Home_pageJS}/>
          <Route key="element" exact path="/Element_page/:id" component={Element}/>
          <Route key="orers" path="/Orders_page" render={()=>{
            return localStorage.getItem('access_token') ? <Orders/> : <Redirect to ="/Login_page"/>
          }} ></Route>
          <Route key="login" exact path="/Login_page" component={Login_page}/>
          <Route key="signup" exact path="/SignUp_page" component={SignUp_page}/>
          <Route key="customer" path="/Customer_page" render={()=>{
            return localStorage.getItem('access_token') ? <Customer/> : <Redirect to ="/Login_page"/>
          }}></Route>
          <Route key="purchase" path="/Purchase_page" component={Purchase} ></Route>
          <Route key="product" path="/Product_page" component={Product__page}/>
        </Switch>
        <Footer></Footer>
      </div>
        </Router> 
    );
}

export default App;