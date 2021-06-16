import '../Home_pageCSS/Popular_Laptop.css';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import image1 from '../assets/images/Acer.jpg';

import axios from 'axios';
import Products from './Products';
import { Link } from 'react-router-dom';
const breakPoints = [
    {
        width: 1, itemsToShow:1
    },
];
const Accessories = () => {
    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: true,

      };
      const [productList,setProductList]=useState()
      useEffect(() => {
          async function fetchData(){
              const requestUrl='http://localhost:9001/api/san-pham?MaLoaiSP=CLtr20KlbLybNIRpz5Lg'
              const respone= await fetch(requestUrl);
              const responseJson= await respone.json();
              const {data} =responseJson;
              setProductList(data);
              console.log(data)
          }
          fetchData();
      }, [])

    return (
        <div className="popular">
        <h6 className="popular__product">Popular Laptop</h6>
        <div className="container">
            <Slider className="slider" {...settings} >
                {productList && productList.map(product=>(
                <Link to={`/Element_page/${product.MaSP}`}>
                    <div className="card" id={product.MaSP}>
                        <div classname="title">
                            <h5>
                                {product.TenSP}
                            </h5>
                        </div>
                        <div classname="img">
                            <img src={product.file&&product.file[0]}></img>
                        </div>
                        <div className="text">
                            {
                                product.Gia
                            }
                        </div>
                        <button className="btbuy">
                            Buy Now
                        </button>
                    </div>
                </Link>
                ))}
            </Slider>
        </div>
    </div>
    );
};

export default Accessories;