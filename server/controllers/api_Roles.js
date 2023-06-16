
const Log       = require("../components/log.js");
const Roles     = require("../models/_roles");

class Api_Roles extends Log {
    name = "Api_Roles";
    async getEntrys(req, res){
        try {
            self.d(".getEntrys");
            const {start, length, search} = req.query;
            /** Получаем и формируем страницу */
            const result = await Roles.getEntrys(search);
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

    async getEntry(req, res){
        try{
            self.d(".getRole");
            const {role_id} = req.query;
            const user_role =   await roles.getRoleById(role_id)
            const response = {
                status: "OK",
                role: user_role,
            };
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async addEntry(req, res){
        try{
            self.d(".saveRole");
            let creator_id = 1;
            const {role} = req.body.params;
            /** Чистим и обезапашиваем входящий массив разрешений */
            let permissions =  {
                changes_read:           role.changes_read,
                changes_read_all:       role.changes_read_all,
                monitoring_read:        role.monitoring_read,
                groups_read:            role.groups_read,
                logs_read:              role.logs_read,
                objects_read:           role.objects_read,
                users_read:             role.users_read,
                groups_edit:            role.groups_edit,
                monitoring_edit:        role.monitoring_edit,
                objects_edit:           role.objects_edit,
                users_edit:             role.users_edit,
                contacts_read:          role.contacts_read,
                contacts_edit:          role.contacts_edit,
                settings_nagios_read:   role.settings_nagios_read,
                settings_nagios_edit:   role.settings_nagios_edit,
                settings_ssl_read:      role.settings_ssl_read,
                settings_ssl_edit:      role.settings_ssl_edit,
                settings_places_read:   role.settings_places_read,
                settings_places_edit:   role.settings_places_edit,
                settings_os_read:       role.settings_os_read,
                settings_os_edit:       role.settings_os_edit,
                settings_div_read:      role.settings_div_read,
                settings_div_edit:      role.settings_div_edit,
                settings_commands_read: role.settings_commands_read,
                settings_commands_edit: role.settings_commands_edit,
                settings_roles_read:    role.settings_roles_read,
                settings_roles_edit:    role.settings_roles_edit,
                requests_alert_read:    role.requests_alert_read,
                requests_self_read:     role.requests_self_read,
                requests_self_edit:     role.requests_self_edit,
                requests_read:          role.requests_read,
                requests_edit:          role.requests_edit,
                max_attempts:           role.max_attempts,
            }
            console.log(role)
            let response = {
                status: "OK"
            }
            /**Проверяем есть ли такой пользователь в базе */
            const user_role =   await roles.getRoleByTitle(role.title)
            if (user_role) {
                response = {
                    status: "ERROR",
                    message: 'Такая роль уже существует',
                   
                }
            } else {
                const result =   await roles.addRole(role.title, JSON.stringify(permissions), creator_id)
                response = {
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
            }
            return res.status(200).json(response)
        } catch (error){
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async updateEntry(req, res){
        try{
            self.d(".updateRole");
             let creator_id = 1;
            const {role, role_id} = req.body.params;
            /** Чистим и обезапашиваем входящий массив разрешений */ 
            let permissions =  {
                changes_read:           role.changes_read,
                changes_read_all:       role.changes_read_all,
                monitoring_read:        role.monitoring_read,
                groups_read:            role.groups_read,
                logs_read:              role.logs_read,
                objects_read:           role.objects_read,
                users_read:             role.users_read,
                groups_edit:            role.groups_edit,
                monitoring_edit:        role.monitoring_edit,
                objects_edit:           role.objects_edit,
                users_edit:             role.users_edit,
                contacts_read:          role.contacts_read,
                contacts_edit:          role.contacts_edit,
                settings_nagios_read:   role.settings_nagios_read,
                settings_nagios_edit:   role.settings_nagios_edit,
                settings_ssl_read:      role.settings_ssl_read,
                settings_ssl_edit:      role.settings_ssl_edit,
                settings_places_read:   role.settings_places_read,
                settings_places_edit:   role.settings_places_edit,
                settings_os_read:       role.settings_os_read,
                settings_os_edit:       role.settings_os_edit,
                settings_div_read:      role.settings_div_read,
                settings_div_edit:      role.settings_div_edit,
                settings_commands_read: role.settings_commands_read,
                settings_commands_edit: role.settings_commands_edit,
                settings_roles_read:    role.settings_roles_read,
                settings_roles_edit:    role.settings_roles_edit,
                requests_alert_read:    role.requests_alert_read,
                requests_read_all:      role.requests_read_all,
                requests_edit_all:      role.requests_edit_all,
                requests_read:          role.requests_read,
                requests_edit:          role.requests_edit,
                objects_read_all:       role.objects_read_all,
                objects_edit_all:       role.objects_edit_all,
                max_attempts:           role.max_attempts,                
                settings_passwd_read:   role.settings_passwd_read,
                settings_passwd_edit:   role.settings_passwd_edit
            }

            const result =   await roles.updateRole(role.title, JSON.stringify(permissions), creator_id, role_id)
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
            self.d(".deleteEntry");
            let creator_id = 1; 
            const {role_id} = req.body.params;
            const result =   await roles.deleteRole(role_id)
            let response = {
                    status: "OK",
                    message: 'Роль удалена'
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
}

const self = new Api_Roles();
module.exports = self;