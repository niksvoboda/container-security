
const Tasks         = require("../models/_tasks"); 
const Log           = require("../components/log.js");
const ImportActives = require("../service/add_task/import_Actives")
    /**
     * Класс данных для страницы заказчиков
     */
class Api_Operation_console extends Log {
        
    name = "Api_Operation_console";

    async getEntrys(req, res) {        
        try {
        const {start, length, search} = req.query;
        const result = await Tasks.getEntrys(search);
      
          let response = {
            status: "OK",
            data: result.slice(Number(start), Number(start)+Number(length)),
            total_entrys: result?.length,            
            }
            //console.log(response)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
    async addEntry(req, res) {
        try {
            const {data} = req.body.params 
            const creator_id = req.user_data.id
            let logs = ''
            let _period = ''
            let _start = ''
            let _end = ''
            let status = ''

            let response = {
                status: "OK",
                message: 'Задача добавлена'
            };  
            switch(data.task_type){ 
                case '2':
                 const {counterAdd, counterUpdate} =  await ImportActives.ImportImages(data.images);
                 const result =  await ImportActives.ImportContainers(data.containers);
                 response.message = `Задача добавлена. 
                 Контейнеров добавлено ${result.counterAdd}, обновлено ${result.counterUpdate}. 
                 Образов добавлено ${counterAdd}, обновлено ${counterUpdate}`
                 break;
                default:
                    console.log("тип задачи не указан");
            }
            //console.log(data)         
       
            let result = await Tasks.addEntry(data.title, data.task_type, logs, _period, creator_id, _start, _end, status);
            //title, task_type, logs, _period, creator_id, _start, _end, status
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

    async deleteEntry(req, res) {
        try {
            self.green(".deleteEntry");            
            const {id} = req.body.params;
            console.log(req.body.params)
            const result =   await Tasks.deleteEntry(id)
            let response = {
                    status: "OK",
                    message: 'Задача удалена'
                }
            /**Если запрос с номером ошибки то выдаем ошибку*/
            if (result[0]?.code?.length > 0 ) {
                response = {
                    status: "ERROR",
                    message: String(result[0].message),
                    login: data.login
                }
            }         
    
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
        }



    /** Для формы редактирования */
    async getEntry(req, res) {
    try {
        const {id} = req.query
        let response = {
            status: "OK",
            message: 'Задача добавлена'
        };
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



    async updateEntry(req, res) {
    try {
        const {data ,id} = req.body.params
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }


}

const self  = new Api_Operation_console();
module.exports = self;