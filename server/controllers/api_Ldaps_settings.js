
const Log        = require("../components/log.js");
const Settings   = require("../models/_settings.js");

class Api_Ldaps_settings extends Log {
    name = "Api_Ldaps";

    async getEntry(req, res){
        try{
            self.green(".getRole");
            const result =  await Settings.getEntrysByGroup('ldap')
            console.log(result)
            let response = {
                status: "OK",
                data: result
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

    async updateEntry(req, res){
        try{
            self.green(".updateEntry");
            let response = {
                status: "OK",
                message: 'Привязка сохранена'
            }
            const {data} = req.body.params;
            console.log(data)
            const params = [[data.url, 'url'], [data.username, 'username'], [data.password, 'password'], [data.baseDN, 'baseDN']]
            const group = 'ldap'

            for (const iterator of params) {
                try {
                    console.log(iterator)
                const result = await Settings.updateSetting(iterator[0], group, iterator[1])
                    /**Если запрос с номером ошибки то выдаем ошибку*/
                    if (result?.errno > 0 ) {
                        response = {
                            status: "ERROR",
                            message: String(result),
                        }
                    }   
                } catch (error) {
                    
                }
            }
              
                 
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

}

const self = new Api_Ldaps_settings();
module.exports = self;