
const Log       = require("../components/log.js");
const Containers     = require("../models/_containers.js");

class Api_Containers extends Log {
    name = "Api_Containers";
    async getEntrys(req, res){
        try {
            self.green(".getEntrys");
            const {start, length, search} = req.query;
            /** Получаем и формируем страницу */
            const result = await Containers.getEntrys(search);
            
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
                console.log(response)
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
            const result =   await Containers.getEntry(id)
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
            /** Чистим и обезопашиваем входящий массив разрешений */
            let permissions =  {              
                dashboards_read:        data.dashboards_read,        
                dashboards_edit:        data.dashboards_edit,
                vulnerabilities_read:   data.vulnerabilities_read ,              
                vulnerabilities_edit:   data.vulnerabilities_edit,
                bestpractice_read:      data.bestpractice_read ,              
                bestpractice_edit:      data.bestpractice_edit ,
                scheduledjobs_read:     data.scheduledjobs_read,              
                scheduledjobs_edit:     data.scheduledjobs_edit ,
                settings_read:          data.settings_read,              
                settings_edit:          data.settings_edit,
                reports_read:           data.reports_read,              
                reports_edit:           data.reports_edit,
            }
            console.log(data)
            let response = {
                status: "OK"
            }
            /**Проверяем есть ли такой пользователь в базе */
            const user_role =   await Containers.getRoleByTitle(data.title)
            console.log(user_role)
            if (user_role?.length>0) {
                response = {
                    status: "ERROR",
                    message: 'Такая роль уже существует',
                   
                }
            } else {
                const result =   await Containers.addEntry(data.title, JSON.stringify(permissions), creator_id)
                response = {
                    status: "OK",
                    message: 'Роль сохранена'
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
            /** Чистим и обезапашиваем входящий массив разрешений */ 
            let permissions =  {
                dashboards_read:        data.dashboards_read,        
                dashboards_edit:        data.dashboards_edit,
                vulnerabilities_read:   data.vulnerabilities_read ,              
                vulnerabilities_edit:   data.vulnerabilities_edit,
                bestpractice_read:      data.bestpractice_read ,              
                bestpractice_edit:      data.bestpractice_edit ,
                scheduledjobs_read:     data.scheduledjobs_read,              
                scheduledjobs_edit:     data.scheduledjobs_edit ,
                settings_read:          data.settings_read,              
                settings_edit:          data.settings_edit,
                reports_read:           data.reports_read,              
                reports_edit:           data.reports_edit,
            }
            console.log(data.title, JSON.stringify(permissions), creator_id, id)    
            const result =   await Containers.updateEntry(data.title, JSON.stringify(permissions), creator_id, id)
            let response = {
                    status: "OK",
                    message: 'Роль сохранена'
                }
            /**Если запрос с номером ошибки то выдаем ошибку*/
            if (result?.errno > 0 ) {
                response = {
                    status: "ERROR",
                    message: String(result),
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
            const result =   await Containers.deleteEntry(id)
            let response = {
                    status: "OK",
                    message: 'Роль удалена'
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
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }
}

const self = new Api_Containers();
module.exports = self;