import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import Authorization_Header from "../Authorization_Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./Orders.css";
import Order__item from "./Order__item/Order__item";
import Buy__item from "./Buy__item/Buy__item";
Orders.propTypes = {
  orders: PropTypes.array,
};
Orders.defaultProps = {
  orders: [],
};

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("orders")))
      setOrders(JSON.parse(localStorage.getItem("orders")));
    else {
      setOrders([]);
    }
    // setImage(product.file && product.file[0]);
  }, []);
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  });
  const [cartItem, setCartItem] = useState([]);

  function onAdd(id, product) {
    setCartItem([...cartItem, { ...product }]);
  }
  function onRemove(id, product) {
    const cartItem1 = [...cartItem];
    const exist = cartItem.find((x) => x.id === id);
    if (exist) {
      setCartItem(cartItem.filter((x) => x.id !== id));
    }
  }
  function onDelete(id) {
    // console.log(id);
    setOrders(orders.filter((order) => order.id !== id));
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  function ContinueSee(){
    history.push("/");
  }
  return (
    <div>
      <Authorization_Header/>
    <div className="orders">
      <div className="container">
        <div className="orders__top">
          <div className="orders__top-title">
            <h3 className="title__name">GIỎ HÀNG</h3>
            <div className="title__wrap">
              <div className="title__wrap-left">
                <i className="fas fa-check">
                     Sản phẩm đã được thêm vào giỏ hàng
                </i>
              </div>
              <div className="title__wrap-right">
                <button className="" onClick={ContinueSee}>Tiếp tục xem sản phẩm</button>
              </div>
            </div>
          </div>
          <div className="orders__top-list">
            <div className="list__headbar">
              <span>Sản phẩm</span>
              <span>giá</span>
              <span>số lượng</span>
              <span>Thành tiền</span>
            </div>
            <div className="">
              <ul className="list__item">
                {orders.map((order) => (
                  <Order__item
                    key={order.id}
                    order={order}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onDelete={onDelete}
                  ></Order__item>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="orders__bottom">
          <div className="orders__bottom-title">
            <h2>TỔNG GIỎ HÀNG</h2>
          </div>
          <div className="orders__bottom-list">
            <div className="list__top">
              <span>Sản phẩm</span>
              <span>Số lượng</span>
              <span>Tổng</span>
            </div>
            <div className="list">
              <Buy__item cartItem={cartItem}></Buy__item>
            </div>
            <div className="list__total">
              <h2 className="list__total-left">Tổng cộng</h2>
              <div className="list__total-right">
                <h2>
                  {cartItem.reduce((acc, currentValue) => {
                    return acc + currentValue.Gia * currentValue.count;
                  }, 0)}
                </h2>
                <span>Đã bao gồm thuế VAT</span>
              </div>
            </div>
            <div className="paybutton">Tiến hành thanh toán</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Orders;
