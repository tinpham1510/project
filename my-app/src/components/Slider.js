import React from 'react';
import image1 from '../assets/images/banner1.png';
import image2 from '../assets/images/banner3.png';
import image3 from '../assets/images/banner4.png';
import { Accordion } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import '../Home_pageCSS/Slider.css';
const Slider = () => {
    return (
        <div class="container1">
         <div class="contain-banner">
  <h1>Welcome to TI' Store!</h1>
  <img class="img" src={image1}/>
   <p>             
     Come to TI' Store on this occasion to get a 50% discount. 
  </p>
 
  <p>
    <Button variant="primary">Explore more</Button>
  </p>
</div>   
        </div>

    );
};

export default Slider;
