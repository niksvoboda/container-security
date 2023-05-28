/**
 * Контроллер авторизации (логин, логаут, обновление токена)
 */
const config    = require("config");
const Users     = require("../models/_users.js");
const jwt       = require('jsonwebtoken');
const sha512    = require('js-sha512');

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
            /** получаем логин и пароль */
            const {email, password} = req.body
            /** если пользователя с таким логином нет то возвращаем информацию об этом */
            //console.log(email, password)
            let user = await Users.getUserByLoginWithRole(email);
            user = user[0]
           // console.log(JSON.parse(user?.permissions).max_attempts)
          // console.log(email, password)
          // console.log(user)
            /**ЕСЛИ ЮЗЕР НЕ НАЙДЕН */
            if(!user){
                return res.status(400).json({message: 'Неправильный пароль или пользователь не найден1'})
            }

            /** Проверяем логин, пароль и активен ли юзер если не правильный - сообщаем */
            const control_passwd = sha512(password + user?.salt);
            let passwd_check;            
            control_passwd === user?.password? passwd_check = true :  passwd_check = false
        //    console.log( control_passwd , user?.password)
         //   console.log(passwd_check)
        //    passwd_check = true
            
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
              //  Syslog.addAction(user_data, "false login", details)
                
                /** Если количество неудачных попыток равно максимальному то блокируем пользователя и обнуляем количество неудачных попыток*/
                if(Number(user?.attempts) == max_attempts) {
                    /** Если в ролевой не стоит галочка "не блокировать"  при максимальном количестве попыток ввода то  блокируем */
                    if(JSON.parse(user?.permissions)?.max_attempts == false){
                        const block_user = await Users.blockUser(email); 
                    }                 
               // const set_attempts = await Users.setAttempts(email, 0);
                return res.status(400).json({message: 'Превышено количество неудачных попыток ввода пароля'})
                }

            } else {
                /** Если пароль правильный обнуляем количество неудачных попыток */
                const set_attempts = await Users.setAttempts(email, 0);
            }
           
            if (user && user?.enabled && passwd_check)  {
                 /** Если пароль правильный - генерируем и возращаем JWT-токен */
                const token =  generateToken(user.user_id, user.username, user.login, user.role_id, user.permissions)
                /** Логируем */
                const user_data = {
                    id: user.user_id, 
                    username: user.username, 
                    login: user.login,
                }
                const details = {"status":"OK","user_id": user.user_id ,"login": user.login}
               // Syslog.addAction(user_data, "login", details)

                return res.json(token)
            } else {
                
                return res.status(400).json({message: 'Неправильный пароль или пользователь не найден2'})
            } 
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации: '+ e})
        } 
    }

    async check(req, res, next){
        try{
            const token = generateToken(user._id, user._roles)
            return res.json({token})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка проверки: '+ e})
        }
    }
    
    async logout(req, res, next){
      
        const {id, username, login} = req.body
             /** Логируем */
          //   console.log(req.user_data)
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