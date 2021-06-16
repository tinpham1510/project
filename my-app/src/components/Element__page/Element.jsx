import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Element.css";
import Header from "../Header";
import Footer from "../Footer";
import Slider from "react-slick";
import { blue, red } from "@material-ui/core/colors";
import Main from "../Main";
import useFetch from "../fetch";
import { useWindowScroll } from 'react-use';
import { useHistory, useParams } from "react-router-dom";
import Authorization_Header from "../Authorization_Header";
import ScrolltoTop from "./ScrolltoTop";
import axios from "axios";

Element.propTypes = {
  post: PropTypes.object,
};

function Element(props) {
  const history = useHistory();
  const routeChange = () => {
    let path = "/Orders_page";
    history.push(path);
  };
  const { id } = useParams();
  const [image, setImage] = useState(
    ""
  );
  const [product, setProduct] = useState({});
  const [orders, setOrder] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const requestUrl = `http://localhost:9001/api/san-pham/${id}`;
      const respone = await fetch(requestUrl);
      const responseJson = await respone.json();
      const { data } = responseJson;
      setProduct(data);
      console.log(data)
    }
    fetchData();
  }, [id]);

  useEffect(()=>{
    async function ApiData(){
      axios.get(`http://localhost:9001/api/san-pham/${id}`)
      .then(resp=>{
          setImage(resp.data.data.file[0])
      })
    }
    ApiData();
  },[])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("orders")))
      setOrder(JSON.parse(localStorage.getItem("orders")));
    else {
      setOrder([]);
    }
    // setImage(product.file && product.file[0]);
  }, []);



  // JSON.stringify(orders)
  const handleAddProduct = (e) => {
    const orders1 = [...orders];
    orders1.push({
      id: id,
      TenSP: product.TenSP,
      Gia: product.Gia,
      count: 1,
      file: product.file,
    });
    setOrder(orders1);
    localStorage.setItem("orders", JSON.stringify(orders1));

    if (JSON.parse(localStorage.getItem("orders"))) {
      routeChange();
    }
  };
  // console.log(orders);
  function infoHandle() {
    var info = document.querySelector(".wrap__bottom-info");
    var des = document.querySelector(".wrap__bottom-description");
    if (des.classList.contains("visible")) {
      des.classList.remove("visible");
    }
    if (info.classList.contains("visible")) {
    } else {
      info.classList.toggle("visible");
    }
    console.log(info);
  }
  function desHandle() {
    var info = document.querySelector(".wrap__bottom-info");
    var des = document.querySelector(".wrap__bottom-description");
    if (info.classList.contains("visible")) {
      info.classList.remove("visible");
    }
    if (des.classList.contains("visible")) {
    } else {
      des.classList.toggle("visible");
    }
    // console.log(des);
  }
  return (
    <div>
      <Authorization_Header/>
    <div className="element">
      {product && (
        <div>
          <div className="element__detail">
            <div className="container">
              <div className="element__detail-tag">
                <div className="tag__top">
                  Home {">"} {product.LoaiSP} 
                </div>
                <div className="tag__bottom"> {product.TenSP}</div>
              </div>
              <div className="element__detail-product">
                <div className="product__image">
                  <div className="image__top">
                    <img src={image}></img>
                  </div>
                  <ul className="image__small">
                    {product.file != null &&
                      product.file.map((file, index) => (
                        <img
                          onClick={() => setImage(product.file[index])}
                          className="image__small-element"
                          src={product.file && product.file[index]}
                          alt=""
                        />
                      ))}
                  </ul>
                </div>
          
                <div className="product__info">
                  <h3>{product.TenSP}</h3>
                  <div>Giá: {product.Gia}</div>
                  <div>Tình trạng: {product.TinhTrang}</div>
                  <div className="information">Thông tin: {product.MoTa}</div>
                  <div className="product__info-color">
                    <span>Màu:</span>
                    <button
                      className="grey color"
                      style={{ backgroundColor: "blue" }}
                    ></button>
                    <button
                      className="white color"
                      style={{ backgroundColor: "red" }}
                    ></button>
                    <button
                      className="red color"
                      style={{ backgroundColor: "grey" }}
                    ></button>
                  </div>
                  <div>
                    <button className="add__button" onClick={handleAddProduct}>
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                <div className="product__guarantee">
                  <div>Bảo hành và dịch vụ
                    <li className="BH"> Đảm bảo độ uy tín của sản phẩm. </li>
                    <li className="BH"> Bảo hành trong vòng 1 tháng khi sản phẩm có lỗi về kĩ thuật </li>
                    <li className="BH"> Cam kết hàng chính hãng 100%. </li>
                    <li className="BH"> Miễn phí vệ sinh laptop trong thời gian bảo hành. </li>
                    <li className="BH"> Hỗ trợ cài đặt hệ điều hành và phần mềm. </li>
                    <li className="BH"> Linh kiện nâng cấp bảo hành theo tiêu chuẩn nhà sản xuất. </li>
                    <li className="BH"> Đảm bảo độ uy tín của sản phẩm </li>
                    
                        
                        
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap">
            <div className="container">
              <div className="wrap__top">
                <div className="demo">
                  <div className="demo__info" onClick={infoHandle}>
                    Mô tả sản phẩm
                  </div>
                  <div className="demo__description" onClick={desHandle}>
                    Thông tin sản phẩm
                  </div>
                </div>
              </div>
              <div className="wrap__bottom">
                <div className="wrap__bottom-info visible">
                  {product.GhiChu}
                </div>
                <div className="wrap__bottom-description">{product.MoTa}</div>
              </div>
            </div>
          </div>
          
        </div>
        

      )}
      <ScrolltoTop/>
      <Main></Main>
    </div>
    </div>
  );
}

export default Element;
