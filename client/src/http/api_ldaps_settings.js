import {$authHost} from "./index"

export const fetchEntry = async (id) => {
    try {
        const {data} = await $authHost.get('api/ldaps/ldap_settings', { params: {id}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateEntry = async (_data, id) => {
    try {
        const {data} = await $authHost.post('api/ldaps/ldap_settings_update', { params: {data:_data, id}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}









