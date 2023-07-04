
const Log       = require("../components/log.js");
const Images     = require("../models/_images.js");

class Api_Images extends Log {
    name = "Api_Images";
    async getEntrys(req, res){
        try {
            self.green(".getEntrys");
            const {start, length, search} = req.query;
            /** Получаем и формируем страницу */
            const result = await Images.getEntrys(search);
            let response = {
              status: "OK",
              data: result.slice(Number(start), Number(start)+Number(length)),
              total_entrys: result?.length,            
              }
              if (result[0]?.code?.length > 0 ) {
                response = {
                    status: "ERROR",
                    message: String(result[0].message)
                }
                }
              return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async getEntry(req, res){
        try{
            self.green(".getRole");
            const {id} = req.query;
            const result =   await Images.getEntry(id)
            let response = {
                status: "OK",
                data: result,
            };
            if (result[0]?.code?.length > 0 ) {
                response = {
                    status: "ERROR",
                    message: String(result[0].message)
                }
            }
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async addEntry(req, res){
        try{
            self.green(".addEntry");
            let creator_id = req.user_data.id;
            const {data} = req.body.params;
            console.log(data)
           
            let response = {
                status: "OK"
            }
            /** 1 тип одиночное добавление 2 тип парсинг из файла, 3 тип парсинг апи */  
            if (data.type == 1) {
                /**Проверяем есть ли такой образ в базе */
                const user_role =   await Images.getImageById(data.image_id)
                console.log(user_role)
                if (user_role?.length>0) {
                    response = {
                        status: "ERROR",
                        message: 'Контейнер уже существует',
                    }
                } else {
                    const result =  await Images.addEntry(data.image_id, data.repository, data.tag, data.size)
                    response = {
                        status: "OK",
                        message: 'Контейнер добавлен'
                    }
                    /**Если запрос с номером ошибки то выдаем ошибку*/
                    if (result[0]?.code?.length > 0 ) {
                        response = {
                            status: "ERROR",
                            message: String(result[0].message),
                            login: data.login
                        }
                    }
                }
                return res.status(200).json(response)
            } else if (data.type == 2) {
                //console.log(data?.images)
                if(data?.images?.length>0){
                    let counter = 0;
                    for (const iterator of data?.images) {
                        try {
                         
                        const result =   await Images.getImageById(iterator[2])  
                        console.log(result)            
                        if (result?.length>0) {

                        } else {
                        counter++;
                        const result =  await Images.addEntry(iterator[2],iterator[0], iterator[1], '--') //data.image_id, data.repository, data.tag, data.size
                        }

                        } catch (error) {
                            
                        }
                    }  

                    response = {
                        status: "OK",
                        message: `Добавлено ${counter} контейнеров`
                    }
                }
                              
                return res.status(200).json(response)
            } else if (data.type == 3) {

            }         
            
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async addEntrys(req, res){
        try{
            self.green(".addEntrys");
            let creator_id = req.user_data.id;
            const {data} = req.body.params;
            console.log(data)
            /** Чистим и обезопашиваем входящий массив разрешений */
            
            let response = {
                status: "OK"
            }
            /**Проверяем есть ли такой образ в базе */
            const user_role =   await Images.getImageById(data.image_id)
            console.log(user_role)
            if (user_role?.length>0) {
                response = {
                    status: "ERROR",
                    message: 'Контейнер уже существует',
                   
                }
            } else {
                const result =   await Images.addEntry(data.image_id, data.repository, data.tag, data.size)
                response = {
                    status: "OK",
                    message: 'Контейнер добавлен'
                }
                /**Если запрос с номером ошибки то выдаем ошибку*/
                if (result[0]?.code?.length > 0 ) {
                    response = {
                        status: "ERROR",
                        message: String(result[0].message),
                        login: data.login
                    }
                }
            }
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async updateEntry(req, res){
        try{
            self.green(".updateEntry");
            let creator_id = req.user_data.id;
            const {data, id} = req.body.params;
            /**  */ 
            console.log(data.image_id, data.repository, data.tag, data.size, id)    
            const result =   await Images.updateEntry(data.image_id, data.repository, data.tag, data.size, id)
            let response = {
                    status: "OK",
                    message: 'Контейнер сохранен'
                }
            /**Если запрос с номером ошибки то выдаем ошибку*/
            if (result[0]?.code?.length > 0 ) {
                response = {
                    status: "ERROR",
                    message: String(result[0].message),                 
                }
            }         
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async deleteEntry(req, res){
        try{
            self.green(".deleteEntry");            
            const {id} = req.body.params;
            const result =   await Images.deleteEntry(id)
            let response = {
                    status: "OK",
                    message: 'Контейнер удален'
                }
            /**Если запрос с номером ошибки то выдаем ошибку*/
            if (result[0]?.code?.length > 0 ){
                response = {
                    status: "ERROR",
                    message: String(result[0].message),
                    login: data.login
                }
            }          
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }
}

const self = new Api_Images();
module.exports = self;