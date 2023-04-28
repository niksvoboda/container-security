const Log  = require("../components/log.js"); 
const Users  = require("../models/_users"); 
    /**
     * Класс данных для страницы заказчиков
     */
class Api_Users extends Log {
    
    name = "Api_Users";

    async getEntrys(req, res) {
        self.d(".getEntrys");
        
        try {
        const {start, length, search} = req.query;
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
        self.d(".getEntry");
    try {
        const {id} = req.query
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

    async addEntry(req, res) {
        self.d(".addEntry");
    try {
        const {data} = req.body.params
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

    async updateEntry(req, res) {
        self.d(".updateEntry");
    try {
        const {data ,id} = req.body.params
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

    async deleteEntry(req, res) {
        self.d(".deleteEntry");
    try {
        const {id} = req.body.params

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

}

const self = new Api_Users();
module.exports = self;