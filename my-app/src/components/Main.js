import React from 'react';
import Slider from './Slider';
import Carousel from 'react-elastic-carousel';
import '../Home_pageCSS/Main.css';
import image1 from '../assets/images/product2.jpg';
import image2 from '../assets/images/laptop_zenbook.jpg';
import image3 from '../assets/images/product1.jpg';
import image4 from '../assets/images/iphone12.jpg';
import image5 from '../assets/images/iphone12.jpg';
import image6 from '../assets/images/oppo.jpg';
import image7 from '../assets/images/airpod.jpg';
import image8 from '../assets/images/applewwtch.jpg';
export default function Main(){
    return (
        <div class="container2">
             <li class="font">Items</li>
            <div class="Contain">
            <Carousel>
                <main class="grid">
                   <article>
                       <img src={image1} alt="Image 1"/>
                            <div class="text">
                                <h3>Mouse</h3>
                                <p>20$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image2} alt="Image 2"/>
                            <div class="text">
                                <h3>Laptop</h3>
                                <p>600$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image3} alt="Image 3"/>
                            <div class="text">
                                <h3>MacBook</h3>
                                <p>850$</p>
                                <button>Buy now</button>
                            </div>                      
                   </article>
                </main>

                <main class="grid">
                   <article>
                       <img src={image1} alt="Image 4"/>
                            <div class="text">
                                <h3>Mouse</h3>
                                <p>20$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image2} alt="Image 5"/>
                            <div class="text">
                                <h3>Laptop</h3>
                                <p>600$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image3} alt="Image 6"/>
                            <div class="text">
                                <h3>MacBook</h3>
                                <p>850$</p>
                                <button>Buy now</button>
                            </div>                      
                   </article>
                </main>
                
                <main class="grid">
                   <article>
                       <img src={image1} alt="Image 1"/>
                            <div class="text">
                                <h3>Mouse</h3>
                                <p>20$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image2} alt="Image 2"/>
                            <div class="text">
                                <h3>Laptop</h3>
                                <p>600$</p>
                                <button>Buy now</button>
                            </div>
                       
                   </article>

                   <article>
                       <img src={image3} alt="Image 3"/>
                            <div class="text">
                                <h3>MacBook</h3>
                                <p>850$</p>
                                <button>Buy now</button>
                            </div>                      
                   </article>
                </main>
                </Carousel>
            </div>
        </div>
    );
};

