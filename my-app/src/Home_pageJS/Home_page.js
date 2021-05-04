import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Product from '../components/Products';
import Laptop from '../components/Popular_Laptop';
import Phone from '../components/Popular_phone';
const Home_page = () => {
    return (
        <div>
            <Header/>
            <Slider/>
            <Main/>
            <Product/>
            <Laptop/>
            <Phone/>
            <Footer/>
        </div>
    );
};

export default Home_page;