import React, { useState,useEffect }  from 'react';
import '../Home_pageCSS/Products.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const Products = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: true,

      };
      const [productList,setProductList]=useState()
      useEffect(() => {
          async function fetchData(){
              const requestUrl='http://localhost:9001/api/san-pham'
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
            <h6 className="popular__product">Popular Products</h6>
            <div className="container_title">
                <Slider {...settings} >
                    {productList && productList.map(product=>(
                    <Link to={`/Element_page/${product.MaSP}`}>
                        <div className="item__element" id={product.MaSP}>
                            
                            <div classname="title">
                                <h5>
                                    {product.LoaiSP}
                                </h5>
                            </div>
                            <div classname="img">
                                <img src={product.file&&product.file[0]}></img>
                            </div>
                            <div className="text">
                                {
                                    product.Gia
                                }$
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

export default Products;