import React from 'react';
import '../Home_pageCSS/Footer.css';
import image1 from '../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
const Footer = () => {
    return (
        <div className="Footer-container">
            <footer className="main-footer">
                <div className="footer-left">
                    <img src={image1} alt=""/>
                    <p>Wellcome to florentino Countinho!!!!</p>
                    <div className="socials">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-google"></i></a>
                        <a href="#"><i className="fa fa-youtube"></i></a>
                        <a href="#"><i className="fa fa-tumblr"></i></a>
                    </div>
                </div>
                <ul className="footer-right">
                    <li>
                        <h2>Products</h2>

                        <ul className="box">
                            <li><a href="#">Laptop</a></li>
                            <li><a href="#">Mouse</a></li>
                            <li><a href="#">Keyboard</a></li>
                            <li><a href="#">Ipad</a></li>
                            <li><a href="#">IOS</a></li>
                            <li><a href="#">Android</a></li>
                        </ul>
                    </li>

                    <li className="features">
                        <h2>About Us</h2>

                        <ul className="box">
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Sales</a></li>
                            <li><a href="#">Certification</a></li>
                            <li><a href="#">Customer Service</a></li>
            
                        </ul>
                    </li>

                    <li>
                        <h2>Address</h2>

                        <ul className="box">
                            <li><a href="#">Room 1519, F2 Building</a></li>
                            <li><a href="#">KTX B, International of University</a></li>
                            <li><a href="#">Linh Trung,</a></li>
                            <li><a href="#">Thu Duc,</a></li>
                            <li><a href="#">Ho Chi Minh City</a></li>
                        </ul>
                    </li>
                </ul>
                <div className="footer-bottom">
                    <p>All Right reserved by &copy;conception 2020</p>
                </div>
            </footer>
        </div>
      
    );
};

export default Footer;
