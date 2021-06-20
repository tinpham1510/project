import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
const Others_product = () => {
    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: true,

      };
      const [productList,setProductList]=useState()
      useEffect(() => {
          async function fetchData(){
              const requestUrl='http://localhost:9001/api/san-pham?MaLoaiSP=%20q6BG4jU0ZZ71hGJwiEMC'
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
        <h6 className="popular__product">Others</h6>
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

export default Others_product;