import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Customer__info from "./Customer__info/Customer__info";
import Customer__history from "./Customer__history/Customer__history";
import {
  BrowserRouter as 
  Route,
  Switch,
  Link,
} from "react-router-dom";
import "./Customer.css";
import Customer__pass from "./Customer__pass/Customer__pass";
import Authorization_Header from "../Authorization_Header";
import axios from "axios";
import Customer__edit from "./Customer__edit/Customer__edit";
import Customer__orders from "./Customer__orders/Customer__orders";
import Detail___orders from "../Detail___orders/Detail___orders";
Customer.propTypes = {};

function Customer(props) {
  const [account, setAccount] = useState([]);
  useEffect(() => {
    async function fetchData() {
      axios.get('http://localhost:9001/api/nguoi-dung/thong-tin', { withCredentials: true }).then((res) => {
        console.log(res.data)
        setAccount(res.data.data);

      })
    }
    fetchData();
  }, []);
  return (
    <>
    <Authorization_Header/>
    <div className="customer">
      <div className="customer__banner">
        <div className="container">
          <span>
            <a href="/">Trang chủ </a>
          </span>
          <span>
            <a href="/Customer_page"> {">"} Khách hàng</a>
          </span>
        </div>
      </div>
      <div className="customer__wrap">
        <div className="container">
          <div className="cus">
            <div className="customer__wrap-left">
              <div className="top">
                <div className="top__image">
                  <img
                    src="https://images.unsplash.com/photo-1585007600263-71228e40c8d1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhciUyMGZhY2Vib29rfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div className="top__info">
                  <div className="top__info-name">{account.HoTenKH}</div>
                  <div className="top__info-edit">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <ul className="action__list">
                  <li className="action__list-item">
                    <div className="item__image">
                      <i class="fa fa-info"></i>
                    </div>
                    <Link to="/Customer_page/info">Thông tin tài khoản</Link>
                  </li>
                  <li className="action__list-item">
                    <div className="item__image">
                      <i class="fa fa-key"></i>
                    </div>
                    <Link to="/Customer_page/customer__pass">
                      Thay đổi mật khẩu
                    </Link>
                  </li>
                  <li className="action__list-item">
                    <div className="item__image">
                      <i class="fa fa-database"></i>
                    </div>
                    <Link to="/Customer_page/customer__orders">
                      Đơn hàng
                    </Link>
                  </li>
                  <li className="action__list-item">
                    <div className="item__image">
                      <i class="fa fa-history"></i>
                    </div>
                    <Link to="/Customer_page/customer__history">
                      Lịch sử mua hàng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="customer__wrap-right">
              <Switch>
                <Route
                  path="/Customer_page/info"
                  component={Customer__info}
                ></Route>
                <Route
                  path="/Customer_page/customer__edit"
                  component={Customer__edit}
                ></Route>
                <Route
                  path="/Customer_page/customer__pass"
                  component={Customer__pass}
                ></Route>
                 <Route
                  path="/Customer_page/customer__orders"
                  component={Customer__orders}
                ></Route>
                <Route
                  path="/Customer_page/customer__history"
                  component={Customer__history}
                ></Route>
                 <Route
                  path="/Customer_page/Detail___orders"
                  component={Detail___orders}
                ></Route>
                <Route path="/Customer_page" component={Customer__info}></Route>
               
        
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );

}

export default Customer;
