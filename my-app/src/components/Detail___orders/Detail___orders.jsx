import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form }  from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading_page/Loading';
import './Detail___orders.css'
function Detail___orders(props) {
    const [Id, setID] = useState(localStorage.getItem('ID_don_hang'));
    const [getData, SetData] = useState([]);
    const [loading, setLoading] = useState(false);
    let id =1;
    const history = useHistory();
    useEffect(()=>{
        console.log(Id)
        axios.get(`http://localhost:9001/api/don-hang/chi-tiet?MaDH=${Id}`, {withCredentials: true})
        .then(resp=>{
            SetData(resp.data.data)
            setLoading(true)
        })
    },[])

    const Back = e =>{
        e.preventDefault();
        history.goBack();
        localStorage.removeItem('ID_don_hang')
    }
    return (
        <div>
            <h2>Chi tiết đơn hàng</h2>
            { loading ?
            
         <div>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Mã đơn hàng</Form.Label>
                    <Form.Control type="text" value={getData.MaDH} readOnly="true" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Mã Khách hàng</Form.Label>
                    <Form.Control type="text" value={getData.MaKH}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={getData.email}>
                    </Form.Control>
                    </Form.Group>    
                    { getData.sanPham != null && 
            getData.sanPham.map((file, index)=>(
                
                <>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Mã Sản phẩm: {getData.sanPham[index].MaSP}</Form.Label>

                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control type="text" value= {getData.sanPham[index].SoLuong}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput5">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control type="text" value={getData.sanPham[index].Gia}>
                    </Form.Control>
                </Form.Group>
                </>
                 ))}
                <Form.Group controlId="exampleForm.ControlInput6">
                    <Form.Label>Tình trạng đơn hàng</Form.Label>
                    <Form.Control type="text" value={getData.TinhTrangDonHang}>
                    </Form.Control>
                </Form.Group>
                
                </Form>
               
            
                <div className="button">
                <button className ="btn btn-info mr-2" onClick={Back}>Quay lại</button>
                </div>
                </div>
                : <Loading/>
                
            }   
            
        </div>
    );
}

export default Detail___orders;