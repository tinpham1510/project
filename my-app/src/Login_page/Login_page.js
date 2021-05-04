import React from 'react';
import './Login_page.css';
import image1 from '../assets/images/Vivo.jpg';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
const Login_page = () => {
    return (
        <section className="page-container">
            <div className="imgBx">
                <img src={image1}/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Sign In</h2>
                    <form>
                        <div className="inputBx">
                            <h6 className="name">Username </h6>
                            <input type="text" name=""></input>
                        </div>
                        <div className="inputBx">
                            <h6 className="name">Password </h6>
                            <input type="password" name=""></input>
                        </div>
                        <div className="remember">
                            <label>
                               <input type="checkbox" name=""></input>
                               <span> Remember me </span>
                            </label>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign in" name=""/>
                        </div>

                        <div className="inputBx">
                            <p>Don't have an account? <a href="#">
                                <Link to="../SignUp_page">
                                Sign up
                                </Link>
                                </a></p>
                        </div>
                    </form>
                    <h3>Login with social media</h3>
                    <ul className="sci">
                        <a href="https://www.facebook.com" url="facebook.com"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
                        <a href="https://www.google.com"><i className="fa fa-google"></i></a>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Login_page;