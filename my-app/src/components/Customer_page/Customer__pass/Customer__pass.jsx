import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Customer__pass.css";
import axios from "axios";
import * as ReactBoostrap from 'react-bootstrap';
import Loading from "../../Loading_page/Loading";
Customer__pass.propTypes = {};

function Customer__pass(props) {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      axios.get('http://localhost:9001/api/nguoi-dung/thong-tin', { withCredentials: true }).then((res) => {
        console.log(res.data)
        setAccount(res.data.data);
        setLoading(true);
      })
    }
    fetchData();
  }, []);

  const UpdateAccount = e => {
    e.preventDefault();
    console.log(account.TaiKhoan)
    console.log(document.getElementById('newPass').value + " "+ document.getElementById('Cnewpass').value)
      axios.put('http://localhost:9001/api/nguoi-dung/doi-mat-khau', {withCredentials: true})
      .then(resp =>{
        if(resp.data.success)
        {
          alert("Change password success!!!")
          console.log(resp.data.success)
        }
        else {
          alert("Failed!!!!")
        }
      })
  }
  return (
    <>
    { loading? 
    <div className="customer__pass">
      {account && (
        <div>
          <h2>Thay đổi mật khẩu</h2>
          <div className="pass__wrap">
            <div className="account">
              <label htmlFor="account">Tài khoản</label>
              <input type="text" readOnly="true" value={account.TaiKhoan} />
            </div>
            <div className="account">
              <label htmlFor="account">Email</label>
              <input type="email" readOnly="true" value={account.email} />
            </div>
            <div className="button">
              <button type="submit" onClick={UpdateAccount}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}
    </div>
    : <Loading></Loading>
}
    </>
  );
}

export default Customer__pass;
