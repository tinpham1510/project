import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Laptop__page.css';

function Laptop__page(props) {
    const [getData, setData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const requestUrl='http://localhost:9001/api/san-pham?MaLoaiSP=CLtr20KlbLybNIRpz5Lg'
            const respone= await fetch(requestUrl);
            const responseJson= await respone.json();
            const {data} =responseJson;
            setData(data);
            console.log(data)
        }
        fetchData();
    }, [])
    return (
        <>
        <div className="product-list" >
           
            <div className="product-container">
            { getData!=null && getData.map((products)=>(
                 
            <div className="card" id={products.MaSP}>
                <div className="title">{products.TenSP}</div>
                <br/>
                <div className="img">
                <Link to={`/Element_page/${products.MaSP}`}>
                <img src={products.file&&products.file[0]}></img>
                </Link>
                </div>
                <div className="text">{products.Gia}$</div>
                <br/>
                <Link to={`/Element_page/${products.MaSP}`}>
                <button className="btbuy">
                            Buy Now
                        </button>
                </Link>
            </div>
           
             ))}
            </div>
           
        </div>
    </>
    );
}

export default Laptop__page;