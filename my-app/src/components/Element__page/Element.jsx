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
import Loading from "../Loading_page/Loading";

Element.propTypes = {
  post: PropTypes.object,
};

function Element(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
      console.log(id)
      setLoading(true);
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
      { loading?
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
                  <div>Gi??: {product.Gia}$</div>
                  <div>T??nh tr???ng: {product.TinhTrang}</div>
                  <div className="information">Th??ng tin: {product.MoTa}</div>
                  <div className="product__info-color">
                    <span>M??u:</span>
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
                      Th??m v??o gi??? h??ng
                    </button>
                  </div>
                </div>
                <div className="product__guarantee">
                  <div>B???o h??nh v?? d???ch v???
                    <li className="BH"> ?????m b???o ????? uy t??n c???a s???n ph???m. </li>
                    <li className="BH"> B???o h??nh trong v??ng 1 th??ng khi s???n ph???m c?? l???i v??? k?? thu???t </li>
                    <li className="BH"> Cam k???t h??ng ch??nh h??ng 100%. </li>
                    <li className="BH"> Mi???n ph?? v??? sinh laptop trong th???i gian b???o h??nh. </li>
                    <li className="BH"> H??? tr??? c??i ?????t h??? ??i???u h??nh v?? ph???n m???m. </li>
                    <li className="BH"> Linh ki???n n??ng c???p b???o h??nh theo ti??u chu???n nh?? s???n xu???t. </li>
                    <li className="BH"> ?????m b???o ????? uy t??n c???a s???n ph???m </li>
                    
                        
                        
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
                    M?? t??? s???n ph???m
                  </div>
                  <div className="demo__description" onClick={desHandle}>
                    Th??ng tin s???n ph???m
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
      <Main key ={product.MaSP}></Main>
    </div>
    : <Loading/>
}
    </div>
  );
}

export default Element;
