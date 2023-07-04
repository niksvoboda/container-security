import React, { useState, useContext } from 'react';
import Containers from './containers/containers';
import Images from './images/images';
import { Link } from 'react-router-dom';
import {  TranslateContext } from '../../contex';

const Objects = () => {
   const [menu_item, set_menu_item] = useState(1);   
   const {translate} = useContext(TranslateContext)
   const settings_menu = [
      {component:<Containers/>, icon: 'fa fa-address-card', name: 'objects.menu.containers' },       
      {component:<Images/>, icon: 'fa fa-at', name: 'objects.menu.images' },   
     ]
    return (
<>
<div className="container-fluid ">
   <div className="row gx-4 mb-3"  >    
      <div className="col-auto my-sm-auto mt-1" >
         <div className="nav-wrapper position-relative  end-0 ">
            <ul className="nav nav-pills nav-fill p-1 flex-row hook_settings_nav"  >
                {settings_menu.map(p=>
                     <li 
                     className={settings_menu.indexOf(p) == menu_item? 'nav-item hook_settings_li hook_sm_active' : 'nav-item hook_settings_li'}
                     onClick={event=>set_menu_item(settings_menu.indexOf(p))}
                     >
                     <a className="nav-link mb-0 px-0 py-1">
                     <i className={p.icon}></i>
                     <span className="ms-1">{translate(p.name)}</span>
                     </a>
                  </li>
                )}
            </ul>
         </div>
      </div>
   </div>
   {settings_menu[menu_item].component}
</div>
</>
    );
};

export default Objects;