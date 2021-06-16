import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Order__item.css";
import Authorization_Header from "../../Authorization_Header";

Order__item.propTypes = {
  order: PropTypes.object,
  onChosen: PropTypes.func,
  onRemove: PropTypes.func,
};
Order__item.propTypes = {
  order: null,
  onChosen: null,
  onRemove: null,
};

function Order__item(props) {
  // const [check, setCheck] = useState(false);
  const { order, onAdd, onRemove, onDelete } = props;
  const [order1, setOrder1] = useState(order);
  // function handleCheck(e) {
  //   const a = order.id;
  //   onChosen(a, e.target.checked, order);
  // }
  function check(e) {
    const a = order1.id;
    console.log(a);
    if (e.target.checked) {
      onAdd(a, order1);
    } else {
      onRemove(a, order1);
    }
  }

  const handleCountMinus = (e) => {
    // if(order1.count)
    setOrder1({ ...order1, count: order1.count - 1 });
  };
  function handleCountPlus(e) {
    setOrder1({ ...order1, count: order1.count + 1 });
  }
  const handleDelete = () => {
    onDelete(order1.id);
  };
  return (
    <div>
    <li className="list__item-product">
      <div className="product__delete">
        <button onClick={handleDelete}>X</button>
      </div>
      <div className="list__item-wrap">
        <div className="product__info">
          <input
            className="product__check"
            type="checkbox"
            onChange={check}
          ></input>
          <div className="product__image">
            <img className="img" src={order1.file && order1.file[0]}></img>
          </div>
          <div>{order1.TenSP}</div>
        </div>
        <span className="product__price">{order1.Gia}$</span>
        <div className="product__num-wrap">
          <button
            className="add__button"
            onClick={handleCountMinus}
            disabled={order1.count <= 0}
          >
            -
          </button>
          <span className="product__num">{order1.count}</span>
          <button className="sub__button" onClick={handleCountPlus}>
            +
          </button>
        </div>
        <span className="product__total">
          {order1.Gia * order1.count}$
        </span>
      </div>
    </li>
    </div>
  );
}

export default Order__item;
