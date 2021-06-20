
import React, { useEffect, useState } from 'react';
import Admin_user from './Admin_user';
import Header from './Header';
//import axios from 'axios';

export default function Authorization_Header(){
    const[login, setLogin] =useState(false);
    const[admin, setAdmin] = useState(false);
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
            {login ? <Admin_user/> : <Header/>}
        </div>
    );
};
