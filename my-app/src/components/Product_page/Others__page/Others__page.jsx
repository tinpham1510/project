import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Others__page(props) {
    const [getData, setData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const requestUrl='http://localhost:9001/api/san-pham?MaLoaiSP=%20q6BG4jU0ZZ71hGJwiEMC'
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
                 <Link to={`/Element_page/${products.MaSP}`}>
            <div className="card" id={products.MaSP}>
                <div className="title">{products.TenSP}</div>
                <br/>
                <div className="img">
                <img src={products.file&&products.file[0]}></img>
                </div>
                <div className="text">{products.Gia}$</div>
                <br/>
                <button className="btbuy">
                            Buy Now
                        </button>

            </div>
            </Link>
             ))}
            </div>
           
        </div>
    </>
    );
}

export default Others__page;