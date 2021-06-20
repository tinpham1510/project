import React, { useEffect, useState } from 'react';
import '../Home_pageCSS/Popular_Laptop.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
const Popular_phone = () => {
    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 2,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: true,

      };
      const [productList,setProductList]=useState()
      useEffect(() => {
          async function fetchData(){
              const requestUrl='http://localhost:9001/api/san-pham?MaLoaiSP=D0n9AlgDHjvK34AZzXA6'
              const respone= await fetch(requestUrl);
              const responseJson= await respone.json();
              const {data} =responseJson;
              setProductList(data);
              console.log(data)
          }
          fetchData();
      }, [])

    return (
        <div className="container2">
        <h6 className="popular__product">Popular Phone</h6>
        <div className="container">
            <Slider className="slider" {...settings} >
                {productList && productList.map(product=>(
                <Link to={`/Element_page/${product.MaSP}`}>
                    <div className="item__element" id={product.MaSP}>
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
                            $
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


export default Popular_phone;