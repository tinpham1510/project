import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Purchase.css';
import { Form} from 'react-bootstrap'
import Authorization_Header from '../Authorization_Header';
import axios from 'axios';
function Purchase(props) {
    let history = useHistory();
    const InputDH = e =>{
        e.preventDefault();
        history.push('/Customer_page/Customer__orders');
        setSuccess(false)
    }
    const [User, setUser] = useState([]);
    const [Success, setSuccess] = useState(false);
    useEffect(()=>{
        async function Data()
        {
        axios.get('http://localhost:9001/api/nguoi-dung/thong-tin', {withCredentials: true})
        .then(resp=>{
            setUser(resp.data.data)
            console.log(resp.data.data)
        })
    }
        Data();
    },[])

    
    const purchase = e=>{
        let rq = {
            TenNguoiNhan: document.getElementById("TenNguoiNhan").value,
            Ate: document.getElementById("Ate").value,
            DiaChi: document.getElementById("diachi").value,
            email: document.getElementById("email").value
        }   
        axios.post('http://localhost:9001/api/gio-hang/thanh-toan',rq, {withCredentials: true})
        .then(resp=>{
            if(resp.data.success){
                setSuccess(true);
            }
        })
        
    }
    return (
        <div>
            
            <Authorization_Header/>
            <div className="container">
                <div className="container">
                    <div className="title">
            <br/>
            <Form.Group>
            <Form.Label>Tên người nhận</Form.Label>
            <Form.Control size="lg" type="text" id="TenNguoiNhan" />
            <br />
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" value={User.Ate} id="Ate"/>
            <br />
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control size="sm" type="text" value={User.DiaChi} id="diachi" />
            <br/>
            <Form.Label>Email</Form.Label>
            <Form.Control size="sm" type="email"  value={User.email} id="email" />
            </Form.Group>
            <div className="button1">
            <buton className="btn btn-info mr-2" onClick={purchase}>Thanh toán</buton>
            </div>
            
            </div>
            </div>
            </div>
            { Success ?
            <div className="container2">
                <div className="font">
                    <div className="container">
                        <div className="title">
                            <br/>
                            <div className="fas fa-check-circle">    Thanh Toán thành công!
                            </div>
                        <br/>
                        <br/>
                        <button className="btnDathang" onClick={InputDH}>Xem chi tiết đơn hàng</button>
                        </div>
                    </div>
                </div>
            </div>
            : 
            <>
            </>
        }
        </div>

    );
}

export default Purchase;