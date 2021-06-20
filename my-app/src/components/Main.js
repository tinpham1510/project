import React, { useState,useEffect } from 'react';
// import Slider from './Slider';
import Slider from 'react-slick'
import { Carousel } from 'react-bootstrap';
import '../Home_pageCSS/Main.css';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from './Loading_page/Loading';

 function Main(){
    let history=useHistory();
    // function handleClick() {
    //     <Link to="/Element_page"></Link>
    //     // history.push("/Element_page");
    //   }
    const [loading, setLoading] = useState(false);
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
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
            setLoading(true)
        }
        fetchData();
    }, [])
    // const { data :productList, pending, error}=useFetch(
    //     "http://localhost:3001/api/san-pham"
    // )
    return (
        <div class="container2">
             <li class="font">Items</li>
            <div className="container">
            { loading?
                <Slider {...settings}>
                    {productList && 
                        productList.map(product=>(
                        <Link to={`/Element_page/${product.MaSP}`}>
                            <div className="item__element">
                                <img src={product.file} alt="Image1"/>
                                <div class="text">
                                    <h3>{product.TenSP}</h3>
                                    <p>{product.Gia}$</p>
                                    <button >Buy now</button>
                                    
                                </div>
                            </div>
                        </Link>
                    ))
                }
                    
                </Slider>
                : <Loading/>
            }
            </div>
           
          
        </div>
    );
};

export default Main

