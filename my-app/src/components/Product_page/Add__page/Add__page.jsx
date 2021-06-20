import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Add__page(props) {
    const history = useHistory();
    const [MaLoaiSP, setMa] = useState("");
    const [check, setCheck]= useState(false);
    
        const CheckProduct = e =>{
            if(document.getElementById("TenSP").value === "")
            {
                alert("Tên sản phẩm không được bỏ trống")
                document.getElementById("TenSP").focus();
            }
            else if(document.getElementById("Gia").value === "")
            {
                alert("Giá không được bỏ trống")
                document.getElementById("Gia").focus();
            }
            else if(document.getElementById("SoLuong").value === "")
            {
                alert("Số lượng không được bỏ trống")
                document.getElementById("SoLuong").focus();
            }
            else if(document.getElementById("TenTH").value === "")
            {
                alert("Tên thương hiệu không được bỏ trống")
                document.getElementById("TenTH").focus();
            }
            else if(document.getElementById("TinhTrang").value === "")
            {
                alert("Tình trạng không được bỏ trống")
                document.getElementById("TinhTrang").focus();
            }
            else if(document.getElementById("ThoiGianSuDung").value === "" )
            {
                alert("Thời gian đã sử dụng không được bỏ trống")
                document.getElementById("ThoiGianSuDung").focus();
            }
            else{
                setCheck(true);
            }
            
        }
        function CheckMaLoaiSP()
        {
            if(document.getElementById("MaLoaiSP").value === "Laptop")
            {
                setMa("CLtr20KlbLybNIRpz5Lg");
                console.log("Lapyop")
            }
            else if(document.getElementById("MaLoaiSP").value === "Phone")
            {
                setMa("D0n9AlgDHjvK34AZzXA6");
                console.log("Phone")
            }
            else if(document.getElementById("MaLoaiSP").value === "Ipad")
            {
                setMa("xrYMeASY0O9lr6zlEZQr");
                console.log("Ipad")
            }
            else{
                setMa("q6BG4jU0ZZ71hGJwiEMC");
                console.log("Others")
            }
        }
    function goback()
    {
        history.push("/Product_page")
    }
     function AddProduct(file){
         
        CheckMaLoaiSP();
        
        const gia = parseInt(document.getElementById("Gia").value);
        const soluong = parseInt(document.getElementById("SoLuong").value);
        const tg = parseInt(document.getElementById("ThoiGianSuDung").value);
        const formData = new FormData();
        formData.append("TenSP", document.getElementById("TenSP").value);
        formData.append("MaLoaiSP", MaLoaiSP);
        formData.append("Gia", gia);
        formData.append("SoLuong", soluong);
        formData.append("MoTa", document.getElementById("MoTa").value);
        formData.append("GhiChu", document.getElementById("GhiChu").value);
        formData.append("TenTH",  document.getElementById("TenTH").value);
        formData.append("XuatXu", document.getElementById("XuatXu").value);
        formData.append("TinhTrang", document.getElementById("TinhTrang").value);
        formData.append("ThoiGianDaSuDung",tg);
        formData.append("file[]", document.getElementById("ok").value);
       
        console.log(document.getElementById("ok").value)
        // if(check)
        // {
            axios({
                withCredentials: true,
                method: 'post',
                url: 'http://localhost:9001/api/san-pham',
                data: formData,
               
            }).then(resp=>{
                if(resp.data.success)
                {
                    alert("Thành công thêm sản phẩm")
                    history.goBack();
                    setCheck(false)
                }
                else{
                    alert("Thêm sản phẩm không thành công")
                    
                }
            })
        // }
        // else{
        //     CheckProduct();
        // }
        
        
     }

     const handleFile = e=>{
         console.log(e.target.files[0].name)
         let file = e.target.files[0];
         AddProduct(file);
         
     }
    return (
            <div className="container">
                <div className="container">
                    <div className="title">
            <br/>
            <Form.Group>
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control size="lg" type="text" id="TenSP" />
            <br />
            <Form.Group id="exampleForm.ControlSelect1">
                <Form.Label>Mã loại sản phẩm</Form.Label>
                <Form.Control as="select" id="MaLoaiSP">
                <option id="laptop">Laptop</option>
                <option id="phone">Phone</option>
                <option id="ipad">Ipad</option>
                <option id="others">Others</option>
                </Form.Control>
            </Form.Group>
            <br />
            <Form.Label>Giá</Form.Label>
            <Form.Control size="sm" type="text" id="Gia" />
            <br/>
            <Form.Label>Số lượng</Form.Label>
            <Form.Control size="sm" type="text"   id="SoLuong" />
            </Form.Group>
            <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control size="lg" as="textarea" rows={3}  id="MoTa" />
            <br />
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control as="textarea" rows={3}  id="GhiChu"/>
            <br />
            <Form.Label>Tên thương hiệu</Form.Label>
            <Form.Control size="sm" type="text" id="TenTH" />
            <br/>
            <Form.Label>Xuất xứ</Form.Label>
            <Form.Control size="sm" type="text"   id="XuatXu" />
            <Form.Label>Tình Trạng</Form.Label>
            <Form.Control size="sm" type="text"   id="TinhTrang" />
            <Form.Label>Thời gian đã sử dụng</Form.Label>
            <Form.Control size="sm" type="text"   id="ThoiGianSuDung" />
            <br/>
            <input type="file" id="ok" onChange={handleFile} accept="image/*"></input>
            </Form.Group>
            <div className="button">
                 <button className="btn btn-info mr-2" onClick={AddProduct}>Thêm</button>
                <button className="btn btn-info mr-2" onClick={goback}>Hủy</button>
                
            </div>
            
            
            </div>
        </div>
    </div>
    );
}

export default Add__page;