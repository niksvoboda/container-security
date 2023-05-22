import {LOGIN_ROUTE, LOGOUT_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      SCHEDULEDJOBS_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE} from "./routes";

export const settings_menu = [
        {link:MAIN_ROUTE, icon: 'home', name: 'LDAP' },       
        {link:DASHBOARD_ROUTE, icon: 'dashboard', name: 'Почта' },   
        {link:VULNERABILITIES_ROUTE, icon: 'warning', name: 'Jira' },         
        {link:BESTPRACTICE_ROUTE, icon: 'view_in_ar', name: 'Пользователи' }, 
        {link:SCHEDULEDJOBS_ROUTE, icon: 'calendar_month', name: 'Роли' },
        {link:SETTINGS_ROUTE, icon: 'settings', name: 'SSL' }, 
        {link:REPORTS_ROUTE, icon: 'assessment', name: 'Логирование' },        
        {link:LOGOUT_ROUTE, icon: 'login', name: 'О системе' }, 
    ] 

