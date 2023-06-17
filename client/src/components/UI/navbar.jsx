import React, {useEffect, useState, useContext} from 'react';
import { aside_menu } from '../../utils/aside_menu';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TranslateContext } from '../../contex/index';
import { Select } from './kit/select';
import { LOGOUT_ROUTE} from "../../utils/routes";

const Navbar = () => {
  const {lang, set_lang, translate} = useContext(TranslateContext)
  const location = useLocation()
  const currentItem = aside_menu.filter(menuitem => menuitem.link === location.pathname);
  const [breadcrumb, set_breadcrumb] = useState('')
  useEffect(() => {
    set_breadcrumb ( `${translate('left_menu.app_name')}  /  ${translate(currentItem[0]?.name? currentItem[0]?.name : 'left_menu.app_name')}` );
  }, [currentItem]);

    return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid" style={{paddingRight:'0px', alignItems:'center'}}>
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
              <Select 
              value={lang}
              defaultValue={lang}
              onChange={lang => set_lang(lang)}
              options={[
              {type: 'ru', name: 'RU'},
              {type: 'en', name: 'EN'}
              ]}                            
              />            
              </a>
            </li>
            &nbsp;&nbsp;
            <li className="nav-item d-flex align-items-center">                         
                  <i className="material-icons opacity-10">settings</i>             
            </li>
            &nbsp;&nbsp;
            <li className="nav-item d-flex align-items-center">
              <Link to={LOGOUT_ROUTE} style={{height:'20px'}}>
                  <i className="material-icons opacity-10">logout</i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;