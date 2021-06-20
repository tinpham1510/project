import React from "react";
//import PropTypes from "prop-types";
import "./Customer__history.css";
Customer__history.propTypes = {};

function Customer__history(props) {
  return (
    <>
    <div className="Customer__history">
      <h2>Lịch sử mua hàng</h2>
      <div className="Customer__history__table__column">
        <li className="Customer__history__table__content">Mã đơn hàng
      
        </li>

        <li className="Customer__history__table__content">Ngày mua</li>

        <li className="Customer__history__table__content">Sản phẩm</li>

        <li className="Customer__history__table__content">Tổng tiền</li>

        <li className="Customer__history__table__content">Trạng thái</li>
      </div>
      <div className="Customer__history__table__list">
        
      </div>
    </div>
    </>
  );
}

export default Customer__history;
