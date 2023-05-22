const Users  = require("../models/_users"); 
const Roles  = require("../models/_roles");
const Passwords = require("../models/_passwords.js");
const Settings  = require("../models/_settings");
const sha512    = require('js-sha512');
    /**
     * Класс данных для страницы заказчиков
     */
class Api_Users  {
        
    name = "Api_Users";

    async getEntrys(req, res) {        
        try {
        const {start, length, search} = req.query;
      //  console.log(start, length, search)
        const result = await Users.getEntrys(search);
          let response = {
            status: "OK",
            data: result.slice(Number(start), Number(start)+Number(length)),
            total_entrys: result?.length,            
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
      //  console.log(id)
        if (id) {
            let user = await Users.getEntry(id);
            const users_roles =   await Roles.getEntrys('')
            const response = {
                status: "OK",
                data: user[0],
                roles: users_roles
            };
            return res.status(200).json(response)
        } else {           
            const users_roles =   await Roles.getEntrys('')
            const response = {
                status: "OK",
                user: null,
                roles: users_roles
            };
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

    async addEntry(req, res) {
    try {
        const {data} = req.body.params
        let response = {
            status: "OK",
            message: 'Пользователь добавлен'
        };
        // создаем соль
        let salt = String(Math.random() * 10 ** 10);
        salt = salt.slice(0,10);
        // на основе нее создаем пароль
        const new_pass = sha512(data.password + salt);
        let result = await Users.addEntry(data.user_id, 
            data.username, 
            data.login, 
            new_pass,
            data.role_id, 
            data.salt,
            data.attempts,
            data.position, 
            data.phone_int, 
            data.phone_mob, 
            data.email, 
            data.enabled,
            data.rem );
           // console.log(result)
        if (result[0]?.errno > 0 ) {
                    response = {
                        status: "ERROR",
                        message: String(result[0].sqlMessage),
                        login: data.login
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
        console.log(data ,id )
        let response =  {
            status: "OK",
            message: "Пользователь сохранен",
        } 
        const result = await Users.updateEntry(id, 
            data.username, 
            data.login, 
            data.role_id, 
            data.position, 
            data.phone_int, 
            data.phone_mob, 
            data.email, 
            data.enabled,
            data.rem   
            );
            console.log(result)
        /**Если задан пароль то отдельно обновляем в базе чтобы не ломать логику обычного редактирования пользователей*/
        if (data.password.length > 0) {            
           // console.log(get_last_passwords)
            const get_user = await Users.getEntry(id)
          //  console.log(get_user[0].salt)
            const new_pass = sha512(data.password + get_user[0].salt); 

            //узнаем запрет на количество последних паролей и включена ли парольная политика
            const { pass_back, pass_enabled } = await Settings.getEntrysByGroup('passwd')
            console.log(pass_back, pass_enabled )
            //получаем последние пароли юзера 
            let get_last_passwords = await Passwords.getPasswordsByUserID(id);
            get_last_passwords = get_last_passwords.slice(0, Number(pass_back))
            // если политика включена и у юзера есть предыдущие пароли то 
            if (pass_enabled == "1" && get_last_passwords?.length>0) {
               // проверяем их на совпадение с новым
              
               for (const e of get_last_passwords)  {
                    if (e.password  == new_pass){
                        response = {
                            status: "ERROR",
                            message: "Пароль уже использовался"
                        }
                        return res.status(200).json(response)
                    }
               }
               // устанавливаем пароль                    
               const add_last_passwords =  Passwords.addPassword( new_pass, id);
               const res_ =  Users.setUserPass(id, new_pass);
                
            } else {
                //если отключена то просто устанавливаем пароль
                const add_last_passwords =  Passwords.addPassword( new_pass, id);
                const res_ =  Users.setUserPass(id, new_pass);
            }
      
        }  
        if (result[0]?.errno > 0 ) {
            response = {
                status: "ERROR",
                message: String(result[0].sqlMessage),
                login: data.login
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
        const {id} = req.body.params
        let response = {
            status: "OK",
            message: 'Пользователь удален'
        };
        let result = await Users.deleteEntry(id);
        if (result[0]?.errno > 0 ) {
            response = {
                status: "ERROR",
                message: String(result[0].sqlMessage),
                login: data.login
            }
        }
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }
}

module.exports = new Api_Users();
