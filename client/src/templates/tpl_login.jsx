import React, {useState, useContext, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from '../contex';
import { login, logout } from "../http/auth_user";
import { useSnackbar } from 'react-simple-snackbar';
import { option_green_snackbar, option_red_snackbar } from '../components/UI/kit/Snackbar';

const Tpl_login = () => {
const now_year = new Date().getFullYear();

  /** Всплывающее сообщение */
  const [openGreen, closeGreen] = useSnackbar(option_green_snackbar)
  const [openRed, closeRed] = useSnackbar(option_red_snackbar)    
  /** при логине страницы узнаем если пользователь имеет действительный токен то подтягиваем все данные */
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const logIn = async () => {
      try{
           const data = await login(username, password)
           const decode = jwt_decode(data)
           if (decode?.id) {
              localStorage.setItem('token', data);
              
              setUser({id:decode.id, username: decode.username, login: decode.login, permissions: JSON.parse(decode.permissions),  isAuth: true})
           }
           navigate("/")
      } catch (e) {
          openRed(e.response.data.message)
      } 
  }

    const Auth = () =>{
      setUser({username: null, login:'nul1l', isAuth: true, role: 0, permissions:{}})
    }

    return (
<>
<div className="container position-sticky z-index-sticky top-0">
    <div className="row">
      <div className="col-12">
      </div>
    </div>
  </div>
  <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('./assets/img/bg-login.jpg')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Вход</h4>
                  
                </div>
              </div>
              <div className="card-body">
                <form role="form" className="text-start">
                  <div className="input-group input-group-outline my-3 ">
                   
                    <input 
                    type="email" 
                    className="form-control"
                    placeholder="Email"
                    value = {username}
                    onChange = {e=> setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                  
                    <input 
                    type="password" 
                    className="form-control"
                    placeholder="Password"
                    value = {password}
                    onChange = {e=> setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-check form-switch d-flex align-items-center mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Запомнить меня</label>
                  </div>
                  <div className="text-center">
                    <button type="button" 
                    onClick ={e => logIn()}
                    className="btn bg-gradient-primary w-100 my-4 mb-2">Вход</button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                  
                    <a href="#" className="text-primary text-gradient font-weight-bold"></a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer position-absolute bottom-2 py-2 w-100">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto">
              <div className="copyright text-center text-sm text-white text-lg-start">
                © {now_year}. ООО "Динатех"                
              </div>
            </div>
            <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white" target="_blank"></a>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
</>);
};

export default Tpl_login;