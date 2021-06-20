import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Switch, Route, Link } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap'
import Element__update__info from '../Element__update__info/Element__update__info';
import './Element__update.css'
function Element__update(props) {
    const { id } = useParams();
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
    let history = useHistory();
 


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
                Tên sản phẩm
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" id="ten" value={products.TenSP} />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Giá
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.Gia} />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Số lượng
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.SoLuong} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Mô tả
                </Form.Label>
                <Col>
                <Form.Control as = "textarea" rows={4} value={products.MoTa} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Ghi chú
                </Form.Label>
                <Col>
                <Form.Control as = "textarea" rows={4} value={products.GhiChu} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Tên thương hiệu
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.TenTH} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Xuất xứ
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.XuatXu} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={3}>
                Tình trạng
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.TinhTrang} />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Form.Label column="lg" lg={5}>
                Thời gian đã sử dụng (năm)
                </Form.Label>
                <Col>
                <Form.Control size="lg" type="text" value={products.ThoiGianDaSuDung} />
                </Col>
            </Form.Row>
            <br/>
            <Link to={`/Product_page/Update__page/Element__update__info/${id}`}>
            <div class="button"  style={{textAlign: "center"}}>
                <button className="btn btn-info mr-0">Cập nhật sản phẩm</button>
                
            </div>
            <br/>
            </Link>
            
            </Form.Group>

            </div>
            <>
            <Switch>
            <Route
                  path="/Product_page/Update__page/Element__update__info/:id"
                  component={Element__update__info}
                ></Route>
            </Switch>
            </>
            </div>
           </>
           
          )}
           </div>
            
         </div>
        </div>
    );
}

export default Element__update;