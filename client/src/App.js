import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
} from "react-router-dom";
import { UserContext } from './contex';
import AppRouter from './components/AppRouter';
import jwt_decode from "jwt-decode";
import SnackbarProvider from 'react-simple-snackbar';

function App() {
  const [user, setUser] = useState({username: null, login:'nul1l', isAuth: false, role: 0, permissions:{}})
  /** при загрузке страницы узнаем если пользователь имеет действительный токен то подтягиваем все данные */
  let  decode
  useState(()=>{
    if(localStorage.getItem('token')){
      try {
     // console.log(localStorage.getItem('token'))
        decode = jwt_decode(localStorage.getItem('token'))
        console.log(decode)
      } catch (error) {
        console.log(error)
       // console.log(localStorage.getItem('token'))
      }
    }
    if (decode?.id) {
       setUser({id:decode.id, username: decode.username, login: decode.login, permissions: JSON.parse(decode.permissions),  isAuth: true})
    }   
  },[])
  return (
    <UserContext.Provider value={{
      user,
      setUser
      }}>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </SnackbarProvider>
    </UserContext.Provider>
  );
}

export default App;
