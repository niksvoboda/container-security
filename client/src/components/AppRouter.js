
import {Route, Routes, Navigate} from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../contex';
import {LOGIN_ROUTE, MAIN_ROUTE, USERS_ROUTE, CUSTOMERS_ROUTE, PROJECTS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, LOGOUT_ROUTE} from "../utils/routes";
import Tpl_login from "../templates/tpl_login";
import Tpl_main from "../templates/tpl_main";
import Customers from "../pages/customers/customers";
import Projects from "../pages/projects/projects";
import Users from "../pages/users/users";
import Settings from "../pages/settings/settings";
import Profile from "../pages/profile/profile";
import LogoutPage from "../pages/logout_page";

const AppRouter = () =>{ 

const {user} = useContext(UserContext)
const publicRoutes = [
        {path: LOGIN_ROUTE, element: <Tpl_login />},
        {path: '*', element: <Navigate to="/login" replace/>}
        ]
const authRoutes = [
            {path: MAIN_ROUTE, element: <Tpl_main page = {<Projects/>}/>},
            {path: USERS_ROUTE, element: <Tpl_main page = {<Users/>}/>},
            {path: CUSTOMERS_ROUTE, element: <Tpl_main page = {<Customers/>}/>},
            {path: PROJECTS_ROUTE, element: <Tpl_main page = {<Projects/>}/>},
            {path: PROFILE_ROUTE, element: <Tpl_main page = {<Profile/>}/>},
            {path: SETTINGS_ROUTE, element: <Tpl_main page = {<Settings/>}/>},
            {path: LOGOUT_ROUTE, element: <Tpl_main page = {<LogoutPage/>}/>},
            {path: '*', element: <Navigate to="/" replace/>}
      ]
     //   console.log(user?.permissions?.logs_read)
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