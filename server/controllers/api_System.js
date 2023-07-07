const Users     = require("../models/_users"); 
const Roles     = require("../models/_roles");
const Passwords = require("../models/_passwords.js");
const Settings  = require("../models/_settings");
const sha512    = require('js-sha512');
const Log       = require('../components/log');
const path      = require('path')
const fs        = require('fs')
    /**
     * Класс данных для страницы заказчиков
     */
class Api_System extends Log{
        
    name = "Api_System";
   
    async getTranslate(req, res) {   
    self.green(".getTranslate");
    try {
    const {lang} = req.query;    
    let fileContent = fs.readFileSync(path.resolve(__dirname,'..', 'translations', `${lang}.json`), "utf8");
   // console.log(fileContent)
          let response = {
            status: "OK",
            data: JSON.parse(fileContent)        
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

}

const self = new Api_System();
module.exports = self;
