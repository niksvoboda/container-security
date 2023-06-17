import {LOGIN_ROUTE, LOGOUT_ROUTE, ONJECTS_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      SCHEDULEDJOBS_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE} from "./routes";


export const aside_menu = [
       // {link:MAIN_ROUTE, icon: 'home', name: 'Главная' },       
        {link:MAIN_ROUTE, icon: 'dashboard', name: 'left_menu.dashboards' },   
        {link:ONJECTS_ROUTE, icon: 'view_in_ar', name: 'left_menu.objects' }, 
        {link:VULNERABILITIES_ROUTE, icon: 'warning', name: 'left_menu.vulnerabilities' },         
        {link:BESTPRACTICE_ROUTE, icon: 'view_in_ar', name: 'left_menu.bestpractice' }, 
        {link:SCHEDULEDJOBS_ROUTE, icon: 'calendar_month', name: 'left_menu.scheduledjobs' },
        {link:SETTINGS_ROUTE, icon: 'settings', name: 'left_menu.settings' }, 
        {link:REPORTS_ROUTE, icon: 'assessment', name: 'left_menu.reports' },
        
      //  {link:LOGOUT_ROUTE, icon: 'logout', name: 'left_menu.logout' }, 
    ] 
