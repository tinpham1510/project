import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading_page/Loading';


function ALL_products(props) {
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData(){
            const requestUrl='http://localhost:9001/api/san-pham'
            const respone= await fetch(requestUrl);
            const responseJson= await respone.json();
            const {data} =responseJson;
            setData(data);
            console.log(data)
            setLoading(true)
        }
        fetchData();
    }, [])
    return (
        <>
        { loading?
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
        :<Loading/>
}
    </>
    );
}

export default ALL_products;