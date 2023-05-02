import {LOGIN_ROUTE, LOGOUT_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      SCHEDULEDJOBS_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE} from "./routes";

export const aside_menu = [
        {link:MAIN_ROUTE, icon: 'person', name: 'Главная' },                
        {link:BESTPRACTICE_ROUTE, icon: 'table_view', name: 'Bestpractice' },        
        {link:DASHBOARD_ROUTE, icon: 'table_view', name: 'Dashboard' },        
        {link:REPORTS_ROUTE, icon: 'table_view', name: 'Reports' },        
        {link:SCHEDULEDJOBS_ROUTE, icon: 'table_view', name: 'Scheduledjobs' },        
        {link:SETTINGS_ROUTE, icon: 'table_view', name: 'Настройки' },
        {link:VULNERABILITIES_ROUTE, icon: 'table_view', name: 'Vulnerabilities' },       
        {link:LOGOUT_ROUTE, icon: 'login', name: 'Выход' },

        //неиспользуемые        
  //     {link:WITHDRAWS_ROUTE, icon: 'receipt_long', name: 'Выводы' },        
  //     {link:DEPOSITS_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Пополнения' },   
  //     {link:USERS_ROUTE, icon: 'table_view', name: 'Пользователи' },        
  //     {link:CUSTOMERS_ROUTE, icon: 'receipt_long', name: 'Клиенты' },        
  //     {link:PROJECTS_ROUTE, icon: 'view_in_ar', name: 'Проекты' },
  //     {link:PROFILE_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Настройки' }, 
  //     {link:SETTINGS_ROUTE, icon: 'person', name: 'Профиль' },  
     //   {link:CHARGES_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Начисления' },                   
    //    {link:WALLETS_ROUTE, icon: 'receipt_long', name: 'Кошельки' },      
    ] 

