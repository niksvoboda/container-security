
const Tasks  = require("../models/_tasks"); 
    /**
     * Класс данных для страницы заказчиков
     */
class Api_Operation_console{
        
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
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }

    async addEntry(req, res) {
    try {
        const {data} = req.body.params
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

    async deleteEntry(req, res) {
    try {
        const {id} = req.body.params

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    }
}

module.exports = new Api_Operation_console();
