import React, { useEffect, useState } from 'react';
import './Customer__orders.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../Loading_page/Loading';

function Customer__orders(props){

    //   useEffect(()=>{
        
    //     axios.get("http://localhost:9001/api/don-hang", {withCredentials:true} )
    //     .then(resp=>{
    //         console.log(resp.data.data)
    //         setData(resp.data.data[0])
            
            
    //     })

    //   },[]);
    const [loading, setLoading] = useState(false);
    const [getData, setData] = useState([]);
    const [dataSP, setDataSP] = useState([]);
    async function Data(){
        axios.get('http://localhost:9001/api/don-hang',{withCredentials: true})
        .then(resp=>{
            setData(resp.data.data)
            setDataSP(resp.data.data.sanPham)
           localStorage.setItem('ID_don_hang',resp.data.data[0].MaDH)
           setLoading(true);
        })
    }
    useEffect(()=>{
        Data();
    },[])

    return (
        
        <>
        { loading? 
    <div className="Customer__orders"  >
      <h2>Đơn hàng</h2>
      
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Mã khách hàng</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    getData && getData.map(Donhang=>(
                        <tr>
                            <td>{Donhang.MaDH}</td>
                            <td>{Donhang.MaKH}</td>
                            <td>{Donhang.TinhTrangDonHang}</td>
                            <td>
                                <Link to = "/Customer_page/Detail___orders" className="btn btn-info mr-2">Xem chi tiết</Link>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
    : <Loading/>
}
        </>
    );

    
}

export default Customer__orders;