import {$host, $authHost} from "./index"
import jwt_decode from "jwt-decode"

export const login = async (email, password, type) => {
    const {data} = await $host.post('api/login', {email, password, type});
    console.log(data)
    return data;
}

export const logout = async (id, username, login) => {
    const {data} = await $host.post('api/logout', {id, username, login});
   // localStorage.setItem('token', 'null');
    return data;
}

export const check = async () => {
    const {data} = await $host.post('api/check');
    localStorage.setItem('token', data.token);
    return jwt_decode(data);
}   