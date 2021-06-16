import React, { useEffect, useState } from 'react';
import Header_auth from './Header_auth';
import Header from './Header';
//import axios from 'axios';

export default function Authorization_Header(){
    const[login, setLogin] =useState(false);
    //const history = useHistory();
    useEffect(() =>{
      function checkLogin(){
        console.log(localStorage.getItem('access_token'))
        if(localStorage.getItem('access_token') != null  ){
          setLogin({
            login: true 
          })
          console.log(login)
        }
        
      }
      checkLogin();
    },[])
    return (
        <div>
            {login ? <Header_auth/> : <Header/>}
        </div>
    );
};
