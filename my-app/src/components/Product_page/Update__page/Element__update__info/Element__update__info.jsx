import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';

function Element__update__info(props) {
    let {id} = useParams();
    let history = useHistory();
    const [products, setProduct] = useState({});
    useEffect(()=>{
        async function fetchData() {
            const requestUrl = `http://localhost:9001/api/san-pham/${id}`;
            const respone = await fetch(requestUrl);
            const responseJson = await respone.json();
            const { data } = responseJson;
            setProduct(data);
            console.log(id)
          }
          fetchData();
    },[id])

    function Update()
    {
       let formData = new FormData();
            formData.append("MaSP", id);
            formData.append("TenSP", document.getElementById("ten").value);
            formData.append("Gia" ,parseInt(document.getElementById("gia").value));
            formData.append("SoLuong", parseInt(document.getElementById("SL").value));
            formData.append("MoTa" ,document.getElementById("Mota").value);
            formData.append("GhiChu", document.getElementById("ghichu").value);
            formData.append("TenTH", document.getElementById("TH").value);
            formData.append("XuatXu", document.getElementById("xuatxu").value);
            formData.append("TinhTrang" ,document.getElementById("TT").value);
            formData.append("ThoiGianDaSuDung", parseInt(document.getElementById("TG").value));
        

        axios({
            method: 'put',
            url:'http://localhost:9001/api/san-pham',
            data: formData,
            withCredentials: true,
            Headers: {
                "Content-Type" : "multipart/form-data",
            }
        }).then(resp=>{
          
                history.push("/Product_page")
            
        })
    }
    return (
        <div>
             <div className="product-list" >
           
           <div className="container_title">
          { products && (
              <>
           <div className="item_element" id={products.MaSP}>
               <div className="title">{products.TenSP}</div>
               <br/>
               <div className="img">
               <img src={products.file&&products.file[0]}></img>
               </div>
               <div className="text">{products.Gia}$</div>
               <br/>

            
           </div>
           <div className="container2">
           <div className="title">
           <Form.Group>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                T??n s???n ph???m
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="ten"  />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Gi??
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="gia" />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                S??? l?????ng
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="SL" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                M?? t???
                </Form.Label>
                <Col>
                <Form.Control as = "textarea" rows={4} id="Mota" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Ghi ch??
                </Form.Label>
                <Col>
                <Form.Control as = "textarea" rows={4} id="ghichu"/>
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                T??n th????ng hi???u
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="TH" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3} >
                Xu???t x???
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id= "xuatxu"/>
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                T??nh tr???ng
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="TT" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={5}>
                Th???i gian ???? s??? d???ng (n??m)
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="TG" />
                </Col>
            </Form.Row>
            <br/>
            <div class="button"  style={{textAlign: "center"}}>
                <button className="btn btn-info mr-0" onClick={Update}>C???p nh???t</button>
                <button className="btn btn-danger mr-0">H???y</button>
            </div>
            <br/>
            
            </Form.Group>

            </div>
        
            </div>
           </>
           
          )}
           </div>
            
         </div>
        </div>
    );
}

export default Element__update__info;