import React, {useEffect, useContext} from 'react';
import { aside_menu } from '../../utils/aside_menu';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TranslateContext } from '../../contex/index';

const Left_menu = () => {
//console.log(aside_menu)
//Обслуживаем title страницы 
   const {translate} = useContext(TranslateContext)
   const location = useLocation()
   const currentItem = aside_menu.filter(menuitem => menuitem.link === location.pathname);
   useEffect(() => {
      document.title = `${translate('left_menu.app_name')}  /  ${translate(currentItem[0]?.name? currentItem[0]?.name : 'left_menu.app_name')}`;
    }, [currentItem]);
    return (
        
<aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark hook_sidenav ">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" ></i>
      <a className="navbar-brand m-0" >
        <img src="../assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo"/>
        <span className="ms-1 font-weight-bold text-white">{translate('left_menu.app_name')}</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto" id="sidenav-collapse-main">
      <ul className="navbar-nav">
      {aside_menu.map(item=>
             <li className="nav-item" key={item.name}>
             <Link
             className={location.pathname === item.link? "nav-link text-white active bg-gradient-primary" : "nav-link text-white"}
             to={item.link}>
               <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                 <i className="material-icons opacity-10">{item.icon}</i>
               </div>
               <span className="nav-link-text ms-1">{translate(item.name)}</span>
             </Link>
           </li>
        )}        
      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        </div>
    </div>
</aside>
    );
};

export default Left_menu;