import React from "react";
import PropTypes from "prop-types";
Buy__item.propTypes = {
  item: PropTypes.object,
  onAdd: PropTypes.func,
  cartItem: PropTypes.array,
};
Buy__item.defaultProps = {
  item: null,
  cartItem: [],
};

function Buy__item(props) {
  const { cartItem } = props;
  // console.log("buy item:", cartItem);
  return (
    <ul className="list__buy">
      {cartItem.map((item) => (
        <li className="buy__item" key={item.id}>
          <div className="buy__item-name">{item.TenSP}</div>
          <span>{item.count}</span>
          <span>{item.count * item.Gia}$</span>
        </li>
      ))}
    </ul>
  );
}

export default Buy__item;
