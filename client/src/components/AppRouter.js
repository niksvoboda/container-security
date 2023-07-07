
import {Route, Routes, Navigate} from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../contex';
import {LOGIN_ROUTE, LOGOUT_ROUTE, ONJECTS_ROUTE, RISKS_ROUTE,
      MAIN_ROUTE, BESTPRACTICE_ROUTE, DASHBOARD_ROUTE, REPORTS_ROUTE, 
      OPERATIONCONSOLE_ROUTE, ACTIVES_ROUTE,  SETTINGS_ROUTE, VULNERABILITIES_ROUTE,
      CONTAINERS_ROUTE,IMAGES_ROUTE,ORCHESTRATIONS_ROUTE,NODES_ROUTE
} from "../utils/routes";
import Tpl_login from "../templates/tpl_login";
import Tpl_main from "../templates/tpl_main";
import LogoutPage from "../pages/logout_page";
import Bestpractice from "../pages/bestpractice/bestpractice";
import Dashboard from "../pages/dashboard/dashboard";
import Objects from "../pages/objects/objects";
import Reports from "../pages/reports/reports";
import OperationConsole from "../pages/operationconsole/operationconsole";
import Vulnerabilities from "../pages/vulnerabilities/vulnerabilities";
import Settings from "../pages/settings/settings";
/**Actives */
import Containers from "../pages/actives/containers/containers";
import Images from "../pages/actives/images/images";
import Nodes from "../pages/actives/nodes/nodes";
import Orchestrations from "../pages/actives/orchestrations/orchestrations";

const AppRouter = () =>{
const {user} = useContext(UserContext)
const publicRoutes = [
        {path: LOGIN_ROUTE, element: <Tpl_login />},
        {path: '*', element: <Navigate to={LOGIN_ROUTE} replace/>}
        ]
const authRoutes = [
            {path: MAIN_ROUTE,            element: <Tpl_main page = {<Dashboard/>}/>},           
            {path: ACTIVES_ROUTE,         element: <Tpl_main page = {<Objects/>}/>},  
                  {path: CONTAINERS_ROUTE,     element: <Tpl_main page = {<Containers/>}/>}, 
                  {path: IMAGES_ROUTE,         element: <Tpl_main page = {<Images/>}/>}, 
                  {path: ORCHESTRATIONS_ROUTE, element: <Tpl_main page = {<Orchestrations/>}/>}, 
                  {path: NODES_ROUTE,          element: <Tpl_main page = {<Nodes/>}/>},            
            {path: BESTPRACTICE_ROUTE,    element: <Tpl_main page = {<Bestpractice/>}/>},            
            {path: DASHBOARD_ROUTE,       element: <Tpl_main page = {<Dashboard/>}/>},            
            {path: REPORTS_ROUTE,         element: <Tpl_main page = {<Reports/>}/>},            
            {path: OPERATIONCONSOLE_ROUTE,element: <Tpl_main page = {<OperationConsole/>}/>},            
            {path: SETTINGS_ROUTE,        element: <Tpl_main page = {<Settings/>}/>},            
            {path: VULNERABILITIES_ROUTE, element: <Tpl_main page = {<Vulnerabilities/>}/>},
            {path: RISKS_ROUTE,           element: <Tpl_main page = {<Vulnerabilities/>}/>},
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