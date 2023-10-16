import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LdapGroups from './ldapGroups';
import LdapSettings from './ldapSettings';

const Ldap = () => {
   const [menu_item, set_menu_item] = useState(0);
   const settings_menu = [
      {component:<LdapGroups/>, icon: 'fa fa-address-card', name: 'Группы' },       
      {component:<LdapSettings/>, icon: 'fa fa-at', name: 'Интеграция' },
  ]
    return (
<div className="row">
   <div className="col-12">
    <div className="card">
    <ul className="nav nav-pills nav-fill p-1 flex-row hook_settings_nav  col-3"  >
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
   {settings_menu[menu_item].component}     
   </div>
 </div>
</div>
);
};

export default Ldap;