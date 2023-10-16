
const Log               = require("../components/log.js");
const Ldap_Roles        = require("../models/_ldap_roles.js");
const Roles             = require("../models/_roles");

class Api_Ldaps extends Log {
    name = "Api_Ldaps";
    async getEntrys(req, res){
        try {
            self.green(".getEntrys");
            const {start, length, search} = req.query;
            /** Получаем и формируем страницу */
            const result = await Ldap_Roles.getEntrys(search);
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
            const result =   await Ldap_Roles.getEntry(id)
            const users_roles =   await Roles.getEntrys('')
            let response = {
                status: "OK",
                data: result[0],
                roles: users_roles
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
            const {data} = req.body.params;
            /** Чистим и обезопашиваем входящий массив разрешений */
            console.log(data)
            let response = {
                status: "OK"
            }
            /**Проверяем есть ли такой пользователь в базе */
            const user_role =   await Ldap_Roles.getRoleByTitle(data.title)
            console.log(user_role)
            if (user_role?.length>0) {
                response = {
                    status: "ERROR",
                    message: 'Такая привязка уже существует',                   
                }
            } else {
                const result = await Ldap_Roles.addEntry(data.title, data.ad_groupname, data.local_role_id)
                response = {
                    status: "OK",
                    message: 'Привязка сохранена'
                }
                /**Если запрос с номером ошибки то выдаем ошибку*/
                if (result[0]?.code?.length > 0 ) {
                    response = {
                        status: "ERROR",
                        message: String(result[0].message),                 
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
            const result =   await Ldap_Roles.updateEntry(data.title, data.ad_groupname, data.local_role_id, id)
            let response = {
                    status: "OK",
                    message: 'Привязка сохранена'
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
            const result =   await Ldap_Roles.deleteEntry(id)
            let response = {
                    status: "OK",
                    message: 'Привязка удалена'
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
}

const self = new Api_Ldaps();
module.exports = self;