const db  = require("../components/db_pg.js");
const Log   = require('../components/log');

class Settings  extends Log {
    name = "Settings";
    /**
     * Возвращает список ключей секции настроек
     * @returns array           Список параметров
     */
    async getEntrysByGroup(group) {        
        self.blue(".getEntrysByGroup")
        const result = await db.asyncQuery(`SELECT * FROM tbl_settings WHERE _group = $1`,  [group]);
        let res = {}
        for (const e of result){
            res[e._key] = e.val
        }   
        return res;
    }
    /**
     * Сохраняет значение ключа настроек
     * @param string group      Имя группы настроек
     * @param string key        Имя ключа
     * @param string val        Значение ключа
     */
    async updateSetting(val, group, key) {        
        self.blue(".updateSetting" + group + " key:" + key + " val:" + val)
       
        await db.asyncQuery(`UPDATE tbl_settings SET val = $1 WHERE _group = $2 AND _key = $3`, [val, group, key]);       
    }   
}


const self  = new Settings();
module.exports = self;