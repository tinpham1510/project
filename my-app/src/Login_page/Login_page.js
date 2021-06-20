import React, { useState } from 'react';
import './Login_page.css';
import image1 from '../assets/images/Vivo.jpg';
import Homepage from '../Home_pageJS/Home_page';
import Authorization_Header from '../components/Authorization_Header';
import { BrowserRouter as  Link } from 'react-router-dom';
import axios from 'axios';
const Login_page = () => {
    const [succeed, setSuccess] = useState(false);
    const [user, setUser] = useState({access_token: "" , isLogin: localStorage.getItem('access_token') != null});

    const login = e =>{
        e.preventDefault();
        let request ={
            TaiKhoan: document.getElementById('Username').value,
            MatKhau: document.getElementById('Password').value

        }
        axios.post("http://localhost:9001/api/auth/login", request, {withCredentials: true})
        .then(resp =>{
            console.log(resp.data);
            axios.get("http://localhost:9001/api/nguoi-dung/thong-tin",{withCredentials:true})
            .then(rep=>{
                localStorage.setItem('loai-nguoi-dung' ,rep.data.data.loai_nguoi_dung);
            })
            if(resp.data.success){
                alert("Login Success!!!!")
                localStorage.setItem("access_token", resp.data.access_token);
                setSuccess({
                    succeed: resp.data.success
                });
                setUser({
                    isLogin: true
                });
                
            }
            else{
                alert("Username or Password wrong!!!!")
            }
        })
    }

    return (
        
        <div>
        
        {succeed ? <Homepage key={user.isLogin}/> :
        <div>
            <Authorization_Header/>
        <section className="page-container">
            <div className="imgBx">
                <img src={image1}/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>ĐĂNG NHẬP</h2>
                    <form onSubmit={login}>
                        <div className="inputBx">
                            <h6 className="name">Tài khoản </h6>
                            <input type="text" id="Username" name="Username"></input>
                        </div>
                        <div className="inputBx">
                            <h6 className="name">Mật khẩu </h6>
                            <input type="password" id="Password" name="Password"></input>
                        </div>
                        <div className="remember">
                            <label>
                               <input type="checkbox" name=""></input>
                               <span> Remember me </span>
                            </label>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Đăng nhập" name=""/>
                        </div>

                        <div className="inputBx">
                            <p>Bạn chưa có tài khoản? <a href="/SignUp_page">
                                <Link to="/SignUp_page">
                                Đăng kí
                                </Link>
                                </a></p>
                        </div>
                    </form>
                    <h3>Login with social media</h3>
                    <ul className="sci">
                        <a href="https://www.facebook.com" url="facebook.com"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
                        <a href="https://www.google.com"><i className="fa fa-google"></i></a>
                    </ul>
                </div>
            </div>
        </section>
        </div>
        }
        </div>
    );
};

export default Login_page;