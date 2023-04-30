import React, {useContext, useEffect} from "react";
import { logout } from "../http/auth_user";
import { UserContext } from '../contex';
import { useNavigate} from "react-router-dom";

const LogoutPage = () =>{
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const logOut = async () => {
        try{
            const data = await logout(user.id, user.username, user.login)
            setUser({username:null, isAuth: false})          
           
        } catch (e) {
         //    console.log(e.response.data.message)
        } 
    }
    useEffect(()=>{
        localStorage.setItem('token', '');
        logOut();
        console.log('logout')
    },[])
    return(
  <>
  </>
    )
}

export default LogoutPage;