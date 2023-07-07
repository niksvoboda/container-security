import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { UserContext, TranslateContext } from './contex';
import AppRouter from './components/AppRouter';
import jwt_decode from "jwt-decode";
import SnackbarProvider from 'react-simple-snackbar';
import { fetchTranslate } from './http/api_system';

function App() {
  const [user, setUser] = useState({username: null, login:'nul1l', isAuth: false, role: 0, permissions:{}})
/** Мультиязычность */
  const [lang, set_lang] = useState(localStorage.getItem('lang') || 'ru')
  const [dictionary, set_dictionary] = useState({})
  const translate = (phrase) =>{
    let phrases =  phrase.split('.')
    let sub_dict = dictionary
    for(const e of phrases){
      sub_dict = sub_dict[e]?  sub_dict[e] : e
    }
    return typeof(sub_dict) == 'string' ? sub_dict : phrase
}
/** подгружаем словари при изменении пикера */
  useEffect(()=>{
    fetchTranslate(lang)
     .then((content) => {
        set_dictionary(content?.data)
     })
      .catch((err) => {console.error(err);})
  },[lang])

/** при загрузке страницы узнаем если пользователь имеет действительный токен то подтягиваем все данные */
  let  decode
  useEffect(()=>{
    if(localStorage.getItem('token')){
      try {
        decode = jwt_decode(localStorage.getItem('token'))
      } catch (error) {
        console.log(error)
      }
    }
    if (decode?.id) {
       setUser({id:decode.id, username: decode.username, login: decode.login, permissions: JSON.parse(decode.permissions),  isAuth: true})
       console.log(JSON.parse(decode.permissions))
    }   
  },[])

  useEffect(()=>{
    localStorage.setItem('lang', lang);
  },[lang])

return(
    <UserContext.Provider value={{
      user,
      setUser
      }}>
        <TranslateContext.Provider value={{
        lang,
        set_lang,
        translate
        }}>
            <SnackbarProvider>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </SnackbarProvider>
        </TranslateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
