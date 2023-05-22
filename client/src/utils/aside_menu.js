import {LOGIN_ROUTE, LOGOUT_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      SCHEDULEDJOBS_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE} from "./routes";

export const aside_menu = [
        {link:MAIN_ROUTE, icon: 'home', name: 'Главная' },       
        {link:DASHBOARD_ROUTE, icon: 'dashboard', name: 'Dashboard' },   
        {link:VULNERABILITIES_ROUTE, icon: 'warning', name: 'Vulnerabilities' },         
        {link:BESTPRACTICE_ROUTE, icon: 'view_in_ar', name: 'Bestpractice' }, 
        {link:SCHEDULEDJOBS_ROUTE, icon: 'calendar_month', name: 'Scheduledjobs' },
        {link:SETTINGS_ROUTE, icon: 'settings', name: 'Настройки' }, 
        {link:REPORTS_ROUTE, icon: 'assessment', name: 'Reports' },
        {link:LOGOUT_ROUTE, icon: 'logout', name: 'Выход' }, 
    ] 

