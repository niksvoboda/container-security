/**
 * Контроллер авторизации (логин, логаут, обновление токена)
 */
const config            = require("config");
const Users             = require("../models/_users.js");
const jwt               = require('jsonwebtoken');
const sha512            = require('js-sha512');
const ActiveDirectory   = require('activedirectory2');
const db_pg             = require('../components/db_pg.js')
const Settings          = require("../models/_settings.js");

/**
 * @description Функция генерации jwt-токена
 * @param {*} - передаем в функцию генерации токена ID пользователя из базы (для использования его на фронтенде при необходимости)
 * @returns - возвращаем из функции сгенерированный jwt-токен с временем жизни 72 часа (задается в настройках)
 * 
 */

const expires_in    = config.get("auth.accessTokenExpTime");
const secret_key    = config.get("auth.secret_key");
const max_attempts  = config.get("auth.max_attempts");
const version       = config.get("version");


const generateToken = (id, username, login, role, permissions) =>{
    const payload = {
        id,
        username,
        login,
        role,
        permissions,
        version
    }
    return jwt.sign(payload, secret_key, {expiresIn: expires_in})
}

class AuthController{
    name = "AuthController";
    /**
     * @description Функция авторизации
     * @param {*} req  - запрос методом POST передает логин и пароль
     * @param {*} res  - ответ либо соответсвующая ошибка, либо если логин и пароль верны - генерируем JWT-токен для проверки запросов пользователя.
     * @returns {*} - возвращаем описанные выше ответы
     */
    async login (req, res) {
        try{
            /** получаем логин и пароль и тип авторизации */
            const {email, password, type} = req.body
            console.log(email, password, type);
            /** Первый тип авторизации "Локальный вход" */
            if (type == '1') {
                    /** если пользователя с таким логином нет то возвращаем информацию об этом */
                    console.log(email, password)
                    let user = await Users.getUserByLoginWithRole(email);
                    user = user[0]
                //  console.log(user)
                    /**ЕСЛИ ЮЗЕР НЕ НАЙДЕН */
                    if(!user){
                        return res.status(400).json({message: 'Неправильный пароль или пользователь не найден1'})
                    }
                    /** Проверяем логин, пароль и активен ли юзер если не правильный - сообщаем */
                    const control_passwd = sha512(password + user?.salt);
                    let passwd_check;            
                    control_passwd === user?.password? passwd_check = true :  passwd_check = false            
                    /**ЕСЛИ ЮЗЕР НАЙДЕН НО ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ВВОДА ПАРОЛЯ */
                    if(Number(user?.attempts)> max_attempts){
                    //   return res.status(400).json({message: 'Неправильный пароль или пользователь не найден'})
                    }
                    /** Если пароль неправильный увеличиваем количество неудачных попыток ввода пароля этим юзером в бд */
                    if (!passwd_check){               
                        const set_attempts = await Users.setAttempts(email, Number(user?.attempts)+1);
                        /** Логируем неудачную попытку входа */
                        const user_data = {
                            id: user?.user_id? user?.user_id : 0, 
                            username: user?.username? user?.username : 0 , 
                            login: email,
                        }
                        const details = {"status":"ERROR", "login": email}                
                        /** Если количество неудачных попыток равно максимальному то блокируем пользователя и обнуляем количество неудачных попыток*/
                        if(Number(user?.attempts) == max_attempts) {
                            /** Если в ролевой не стоит галочка "не блокировать"  при максимальном количестве попыток ввода то  блокируем */
                            if(JSON.parse(user?.permissions)?.max_attempts == false){
                                const block_user = await Users.blockUser(email); 
                            }                 
                        return res.status(400).json({message: 'Превышено количество неудачных попыток ввода пароля'})
                        }
                    } else {
                        /** Если пароль правильный обнуляем количество неудачных попыток */
                        const set_attempts = await Users.setAttempts(email, 0);
                    }           
                    if (user && user?.enabled && passwd_check){
                        /** Если пароль правильный - генерируем и возращаем JWT-токен */
                        const token =  generateToken(user.user_id, user.username, user.login, user.role_id, user.permissions)
                        /** Логируем */
                        const user_data = {
                            id: user.user_id, 
                            username: user.username,
                            login: user.login,
                        }
                        const details = {"status":"OK","user_id": user.user_id ,"login": user.login}
                        return res.json(token)
                    } else {
                        return res.status(400).json({message: 'Неправильный пароль или пользователь не найден: code 2'})
                    } 
        /** Второй тип авторизации "AD Вход" */
            } else if(type == '2'){       
                        console.log('type == 2');
                        /** Получаем креды с разрешениям для поиска групп юзеров  */     
                        const result =  await Settings.getEntrysByGroup('ldap')
                        const config = {
                            url: result?.url,            //'ldap://metal.local',
                            baseDN: result?.baseDN,      //'dc=metal,dc=local',
                            username: result?.username,  //'Администратор@metal.local',
                            password: result?.password,  //'ПочемуМыЕщеЖивы?' 
                        }
                        /**  */
                        const ad = new ActiveDirectory(config);

                        /** Проверяем правильность логина и пароля юзера в AD email, password, type */ 
                        const _username = email //'topinr@metal.local';
                        const _password = password //'!QAZ2wsx';

                        ad.authenticate(_username, _password, async function(err, auth) {
                        if (err) {
                            console.log('ERROR: '+JSON.stringify(err));
                            return res.status(400).json({message: 'Неправильный пароль или пользователь не найден: AD'})
                        }
                        /** Если пароль правильный то чекаем группы юзера */    
                        if (auth) {
                            console.log('Authenticated!');
                            /** Получаем соответсвия групп из бд группам в АД */                        
                            let local_permissions
                            const local_groups = await db_pg.asyncQuery(`SELECT 
                            tbl_ad_users_roles.ad_role_id,
                            tbl_ad_users_roles.ad_groupname,
                            tbl_ad_users_roles.local_role_id,
                            tbl_users_roles.permissions AS permissions
                            FROM tbl_ad_users_roles 
                            LEFT JOIN tbl_users_roles ON tbl_users_roles.role_id = tbl_ad_users_roles.local_role_id`, [])
                        
                            /** Получаем список групп пользователя в AD */
                            const userPrincipalName = email;
                            ad.getGroupMembershipForUser(userPrincipalName, async function(err, groups) {
                                if (!groups) {
                                    console.log('User: ' + userPrincipalName + ' not found.');
                                } else {
                                    console.log('groups: ' , groups);
                                    /**Если группы найдены то пробегаемся по ним и ищем совпадения с локальными группами */ 
                                    if (groups) {
                                        for (const iterator of groups) {
                                            const search = local_groups.filter(p=>p.ad_groupname == iterator?.cn)
                                                if (search.length > 0) {
                                                    local_permissions = search[0].permissions
                                                    console.log("local_permissions", local_permissions);
                                                }
                                                    /** Если содержится то выдаем токен и назначаем роль */
                                                    if (local_permissions) {
                                                        /** Проверяем есть ли юзер в нашей бд в таблице юзеров АД, если нет добавляем */
                                                        /** Если пароль правильный - генерируем и возращаем JWT-токен */
                                                        const token =  generateToken(1, 'topinr' , _username, 1, local_permissions)
                                                        /** Логируем */
                                                        const user_data = {
                                                            id: 1, 
                                                            username: 'topinr',
                                                            login: _username,
                                                        }
                                                        const details = {"status":"OK","ad_user_id": 1 ,"ad_login": _username}
                                                        return res.json(token)
        
                                                    } 
                                            }
                                    } else {
                                        return res.status(400).json({message: 'Нет прав доступа: AD'})
                                    }
                                }
                                if (err) {
                                    console.log('ERROR: ' +JSON.stringify(err));                        
                                }
                            });
                        }
                        else {
                            console.log('Authentication failed!');
                        }
                        });
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации: '+ e})
        } 
    }

    
    async logout(req, res, next){      
        const {id, username, login} = req.body
             /** Логируем */
             const user_data = {
                id: id, 
                username: username, 
                login:login,
            }
             const details = {"status":"OK","user_id": id ,"login": login}
          //   Syslog.addAction(user_data, "logout", details)
             res.status(200).json({message: 'logout'})        
    }  
}

const self = new AuthController();
module.exports = self;