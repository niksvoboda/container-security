
import {Route, Routes, Navigate} from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../contex';
import {LOGIN_ROUTE, LOGOUT_ROUTE, ONJECTS_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, SCHEDULEDJOBS_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE} from "../utils/routes";
import Tpl_login from "../templates/tpl_login";
import Tpl_main from "../templates/tpl_main";
import LogoutPage from "../pages/logout_page";
import Bestpractice from "../pages/bestpractice/bestpractice";
import Dashboard from "../pages/dashboard/dashboard";
import Objects from "../pages/objects/objects";
import Reports from "../pages/reports/reports";
import Scheduledjobs from "../pages/scheduledjobs/scheduledjobs";
import Vulnerabilities from "../pages/vulnerabilities/vulnerabilities";
import Settings from "../pages/settings/settings";

const AppRouter = () =>{
const {user} = useContext(UserContext)
const publicRoutes = [
        {path: LOGIN_ROUTE, element: <Tpl_login />},
        {path: '*', element: <Navigate to={LOGIN_ROUTE} replace/>}
        ]
const authRoutes = [
            {path: MAIN_ROUTE,            element: <Tpl_main page = {<Dashboard/>}/>},           
            {path: ONJECTS_ROUTE,         element: <Tpl_main page = {<Objects/>}/>},     
            {path: BESTPRACTICE_ROUTE,    element: <Tpl_main page = {<Bestpractice/>}/>},            
            {path: DASHBOARD_ROUTE,       element: <Tpl_main page = {<Dashboard/>}/>},            
            {path: REPORTS_ROUTE,         element: <Tpl_main page = {<Reports/>}/>},            
            {path: SCHEDULEDJOBS_ROUTE,   element: <Tpl_main page = {<Scheduledjobs/>}/>},            
            {path: SETTINGS_ROUTE,        element: <Tpl_main page = {<Settings/>}/>},            
            {path: VULNERABILITIES_ROUTE, element: <Tpl_main page = {<Vulnerabilities/>}/>},
            {path: LOGOUT_ROUTE,          element: <Tpl_main page = {<LogoutPage/>}/>},
            {path: '*',                   element: <Navigate to={MAIN_ROUTE} replace/>}
      ]
 return(
         <>
         <Routes>
            {
            user.isAuth?
                  authRoutes.map((p)=> <Route key={authRoutes.indexOf(p)} path = {p.path} element = {p.element}/>)
            :
                  publicRoutes.map((p)=><Route key={publicRoutes.indexOf(p)} path = {p.path} element = {p.element}/>)
            }
         </Routes>
         </>
   )
}

export default AppRouter;