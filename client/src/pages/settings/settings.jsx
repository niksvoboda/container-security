import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import About from './about/about';
import Email from './email/email';
import Jira from './jira/jira';
import Ldap from './ldap/ldap';
import Logs from './logs/logs';
import Roles from './roles/roles';
import Ssl from './ssl/ssl';
import Users from './users/users';


const Settings = () => {
   const [menu_item, set_menu_item] = useState(4);
   const settings_menu = [
      {component:<Ldap/>, icon: 'fa fa-address-card', name: 'LDAP' },       
      {component:<Email/>, icon: 'fa fa-at', name: 'Почта' },   
      {component:<Jira/>, icon: 'fa fa-jira', name: 'Jira' },         
      {component:<Users/>, icon: 'fa fa-users', name: 'Пользователи' }, 
      {component:<Roles/>, icon: 'fa fa-user', name: 'Роли' },
      {component:<Ssl/>, icon: 'fab fa-expeditedssl', name: 'SSL' }, 
      {component:<Logs/>, icon: 'fas fa-clipboard-list', name: 'Логирование' },        
      {component:<About/>, icon: 'fa fa-tv', name: 'О системе' }, 
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
                     <span className="ms-1">{p.name}</span>
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

export default Settings;