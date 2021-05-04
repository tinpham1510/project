import React from 'react';
import '../Login_page/Login_page.css';
import image1 from '../assets/images/Vivo.jpg';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
const SignUp_page = () => {
    return (
        <section className="page-container">
            <div className="imgBx">
                <img src={image1}/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Sign Up</h2>
                    <form>
                        <div className="inputBx">
                            <h6 className="name">Username or email </h6>
                            <input type="text" name=""></input>
                        </div>
                        <div className="inputBx">
                            <h6 className="name">Password </h6>
                            <input type="password" name=""></input>
                        </div>
                        <div className="inputBx">
                            <h6 className="name">Confirm password</h6>
                            <input type="password" name=""></input>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign up" name=""/>
                        </div>

                        <div className="inputBx">
                            <p>Already have an account? <a href="#">npm
                                <Link to="../Login_page/"> 
                                Sign in
                                </Link>
                               </a></p>
                        </div>
                    </form>
                    <h3>Login with social media</h3>
                    <ul className="sci">
                        <a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
                        <a href="https://www.google.com"><i className="fa fa-google"></i></a>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SignUp_page;