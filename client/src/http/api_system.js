import {$authHost} from "./index"


export const fetchTranslate = async (lang) => {
    try {
        const {data} = await $authHost.get('api/translate', { params: {lang}});
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}






