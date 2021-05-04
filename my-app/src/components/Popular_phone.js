import React from 'react';
import '../Home_pageCSS/Popular_Laptop.css';
import image1 from '../assets/images/xiaomi-redmi-9t-6gb-(6).jpg';
import image2 from '../assets/images/vivo-y20s-(4).jpg';
import image3 from '../assets/images/xiaomi.jpg';
import image4 from '../assets/images/iphone-11-128gb-(14).jpg';
const Popular_phone = () => {
    return (
        <section className="container-title">
            <h6 className="popular-product">Popular Phone</h6>
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

export default Popular_phone;