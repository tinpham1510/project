import React, { useEffect, useState } from 'react';
import '../Home_pageCSS/Header_auth.css'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Header_auth_admin =()=>{
    let history=useHistory();
    const orders='/Orders_page';
    // function handleClick(a) {
    //     history.push(a);
    //   }

    //const [success,setSuccess]=useState(false);
    const [account,setAccount]= useState([]);
  
    useEffect(()=>{
        async function Data(){
          axios.get('http://localhost:9001/api/nguoi-dung/thong-tin', { withCredentials: true }).then((res) => {
          console.log(res.data.success)
          setAccount(res.data.data);
  
        })
        }
        Data();
      },[])

    const Logout = e=>{
        e.preventDefault();
        localStorage.removeItem('access_token');
        alert("Log out Success!!!!")
        localStorage.removeItem('loai-nguoi-dung');
        localStorage.removeItem('Orders');
        history.push('/Login_page');
    }
    return (
        <div className="header_auth_admin">
            <header class="px-3 bg-dark text-white">
            <div class="container_auth">
                { account && (
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <svg class="bi me-2" width="40" height="32">
                            <use xlinkHref="#bootstrap">
                                #shadow-root
                                <svg id="bootstrap" viewBox="0 0 118 94">
                                    <title>IT Store</title>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M 24.509 0 c -6.733 0 -11.715 5.893 -11.492 12.284 c 0.214 6.14 -0.064 14.092 -2.066 20.577 C 8.943 39.365 5.547 43.485 0 44.014 v 5.972 c 5.547 0.529 8.943 4.649 10.951 11.153 c 2.002 6.485 2.28 14.437 2.066 20.577 C 12.794 88.106 17.776 94 24.51 94 H 93.5 c 6.733 0 11.714 -5.893 11.491 -12.284 c -0.214 -6.14 0.064 -14.092 2.066 -20.577 c 2.009 -6.504 5.396 -10.624 10.943 -11.153 v -5.972 c -5.547 -0.529 -8.934 -4.649 -10.943 -11.153 c -2.002 -6.484 -2.28 -14.437 -2.066 -20.577 C 105.214 5.894 100.233 0 93.5 0 H 24.508 Z M 80 57.863 C 80 66.663 73.436 72 62.543 72 H 44 a 2 2 0 0 1 -2 -2 V 24 a 2 2 0 0 1 2 -2 h 18.437 c 9.083 0 15.044 4.92 15.044 12.474 c 0 5.302 -4.01 10.049 -9.119 10.88 v 0.277 C 75.317 46.394 80 51.21 80 57.863 Z M 60.521 28.34 H 49.948 v 14.934 h 8.905 c 6.884 0 10.68 -2.772 10.68 -7.727 c 0 -4.643 -3.264 -7.207 -9.012 -7.207 Z M 49.948 49.2 v 16.458 H 60.91 c 7.167 0 10.964 -2.876 10.964 -8.281 c 0 -5.406 -3.903 -8.178 -11.425 -8.178 H 49.948 Z"></path>
                                </svg>
                            </use>
                        </svg>
                    </a>
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <a href="/" class="nav-link text-secondary">
                                Trang chủ
                            </a>
                        </li>

                        <li>
                            <a href="#" class="nav-link text-secondary">
                                Báo cáo 
                            </a>
                        </li>

                        <li>
                            <a href="/Orders_page" class="nav-link text-secondary">
                                Giỏ hàng
                            </a>
                        </li>

                        <li>
                            <a href="/Product_page" class="nav-link text-secondary">
                                Sản phẩm
                            </a>
                        </li>

                        <li>
                            <a href="/Customer_page" class="nav-link text-secondary">
                                {account.HoTenKH}
                            </a>
                        </li>
                    </ul>
                    <button type="button" class="btn btn-outline-light me-2" onClick={Logout}>Đăng xuất</button>
                    <form class="col-12 col-lg auto mb-3 mb-lg-0 me-lg-3">
                        
                        
                    </form>
                    

                </div>
                )}
            </div>
        </header> 
                
        </div>  
    );
};
export default Header_auth_admin;