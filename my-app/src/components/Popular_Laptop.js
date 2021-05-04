import '../Home_pageCSS/Popular_Laptop.css';
import React from 'react';
import Slider from './Slider';
import image1 from '../assets/images/Acer.jpg';
import image2 from '../assets/images/Macbook.jpg';
import image3 from '../assets/images/Lenovo.jpg';
import image4 from '../assets/images/Vivo.jpg';
import image5 from '../assets/images/product1.jpg';
import image6 from '../assets/images/applewwtch.jpg';
const breakPoints = [
    {
        width: 1, itemsToShow:1
    },
];
const Accessories = () => {
    return (
            <section className="container-title">
            <h6 className="popular-product">Popular Laptop</h6>
            <div className="product-list">
                <div className="card">
                    <div Classname="title">
                        <h5>
                            Products
                        </h5>
                    </div>
                    <div Classname="img">
                        <img src={image1}></img>
                    </div>
                    <div className="text">
                        $500.00
                    </div>

                    <button className="btbuy">
                        Buy Now
                    </button>

                </div>
                <div className="card">
                    <div Classname="title">
                        <h5>
                            Products
                        </h5>
                    </div>
                    <div Classname="img">
                        <img src={image2}></img>
                    </div>
                    <div className="text">
                        $200.00
                    </div>

                    <button className="btbuy">
                        Buy Now
                    </button>

                </div>
                <div className="card">
                    <div Classname="title">
                        <h5>
                            Products
                        </h5>
                    </div>
                    <div Classname="img">
                        <img src={image3}></img>
                    </div>
                    <div className="text">
                        $1000.00
                    </div>

                    <button className="btbuy">
                        Buy Now
                    </button>

                </div>
                <div className="card">
                    <div Classname="title">
                        <h5>
                            Products
                        </h5>
                    </div>
                    <div Classname="img">
                        <img src={image4}></img>
                    </div>
                    <div className="text">
                        $50.00
                    </div>

                    <button className="btbuy">
                        Buy Now
                    </button>

                </div>
                
            </div>
        </section>
        
    );
};

export default Accessories;