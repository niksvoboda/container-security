import {ACTIVES_ROUTE,LOGIN_ROUTE, LOGOUT_ROUTE, ONJECTS_ROUTE,RISKS_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      OPERATIONCONSOLE_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE,
      CONTAINERS_ROUTE,IMAGES_ROUTE,ORCHESTRATIONS_ROUTE,NODES_ROUTE
    } from "./routes";


export const aside_menu = [
       // {link:MAIN_ROUTE, icon: 'home', name: 'Главная' },       
        {link:MAIN_ROUTE,     icon: 'dashboard', name: 'left_menu.dashboards' },   
        {link:ACTIVES_ROUTE,  icon: 'view_in_ar', name: 'left_menu.invertory', childs:[
            {link:CONTAINERS_ROUTE,     icon: 'apps', name: 'left_menu.containers' },    
            {link:IMAGES_ROUTE,         icon: 'warning', name: 'left_menu.images' },         
            {link:ORCHESTRATIONS_ROUTE, icon: 'view_in_ar', name: 'left_menu.orchestrations' },                     
            {link:NODES_ROUTE,          icon: 'receipt_long', name: 'left_menu.nodes' },
        ]},
        {link:RISKS_ROUTE,            icon: 'warning', name: 'left_menu.risks' },    
        {link:VULNERABILITIES_ROUTE,  icon: 'warning', name: 'left_menu.vulnerabilities' },         
        {link:BESTPRACTICE_ROUTE,     icon: 'view_in_ar', name: 'left_menu.bestpractice' }, 
        {link:OPERATIONCONSOLE_ROUTE, icon: 'calendar_month', name: 'left_menu.scheduledjobs' },
        {link:SETTINGS_ROUTE,         icon: 'settings', name: 'left_menu.settings' }, 
        {link:REPORTS_ROUTE,          icon: 'assessment', name: 'left_menu.reports' },        
      //  {link:LOGOUT_ROUTE, icon: 'logout', name: 'left_menu.logout' }, 
    ] 

