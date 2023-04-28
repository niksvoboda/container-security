import {MAIN_ROUTE, WITHDRAWS_ROUTE, DEPOSITS_ROUTE, TRANSACTIONS_ROUTE,WALLETS_ROUTE, CHARGES_ROUTE,
    USERS_ROUTE, CUSTOMERS_ROUTE, PROJECTS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE,   LOGOUT_ROUTE} from "./routes";

export const aside_menu = [
        {link:MAIN_ROUTE, icon: 'person', name: 'Пользователи' },        
        {link:TRANSACTIONS_ROUTE, icon: 'table_view', name: 'Транзакции' },
        {link:CHARGES_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Начисления' },                   
        {link:WALLETS_ROUTE, icon: 'receipt_long', name: 'Кошельки' },             
        {link:LOGOUT_ROUTE, icon: 'login', name: 'Выход' },

        //неиспользуемые        
  //     {link:WITHDRAWS_ROUTE, icon: 'receipt_long', name: 'Выводы' },        
  //     {link:DEPOSITS_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Пополнения' },   
  //     {link:USERS_ROUTE, icon: 'table_view', name: 'Пользователи' },        
  //     {link:CUSTOMERS_ROUTE, icon: 'receipt_long', name: 'Клиенты' },        
  //     {link:PROJECTS_ROUTE, icon: 'view_in_ar', name: 'Проекты' },
  //     {link:PROFILE_ROUTE, icon: 'format_textdirection_r_to_l', name: 'Настройки' }, 
  //     {link:SETTINGS_ROUTE, icon: 'person', name: 'Профиль' },
    ] 

