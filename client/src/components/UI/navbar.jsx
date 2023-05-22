import React, {useEffect, useState} from 'react';
import { aside_menu } from '../../utils/aside_menu';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const location = useLocation()
  const currentItem = aside_menu.filter(menuitem => menuitem.link === location.pathname);
  const [breadcrumb, set_breadcrumb] = useState('')
  useEffect(() => {
    set_breadcrumb ('CS Monitor / '+ currentItem[0].name);
   }, [currentItem]);

    return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" >{breadcrumb}</a></li>
          </ol>         
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            
          </div>
          <ul className="navbar-nav justify-content-end">
           
            <li className="nav-item d-flex align-items-center">
              <a className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
               
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a  className="nav-link text-body p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a  className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" >
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 "/>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li> 
              </ul>
            </li>
            <li className="nav-item px-3 d-flex align-items-center" style={{paddingTop:'2px'}}>
              <a className="nav-link text-body p-0">
                <i className="fa material-icons opacity-10 fixed-plugin-button-nav cursor-pointer">logout</i> 
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;