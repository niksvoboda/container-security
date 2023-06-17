import {$authHost} from "./index"

export const fetchEntrys = async (start, length, search) => {
    try {
        const {data} = await $authHost.get('api/roles/roles', { params: {start, length, search}});
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchEntry = async (id) => {
    try {
        const {data} = await $authHost.get('api/roles/role', { params: {id}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteEntry = async (id) => {
    try {
        console.log(id)
        const {data} = await $authHost.post('api/roles/role_delete', { params: {id}});
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}


export const addEntry = async ( _data) => {
    try {
        const {data} = await $authHost.post('api/roles/role_add', { params: {data: _data}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateEntry = async (_data, id) => {
    try {
        const {data} = await $authHost.post('api/roles/role_update', { params: {data:_data, id}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}









