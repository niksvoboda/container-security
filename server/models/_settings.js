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
        const result = await db.asyncQuery("SELECT * FROM tbl_settings WHERE `group` IN(?);",  [group]);
        let res = {}
        for (const e of result){
            res[e.key] = e.val
        }   
        return res;
    }
    /**
     * Сохраняет значение ключа настроек
     * @param string group      Имя группы настроек
     * @param string key        Имя ключа
     * @param string val        Значение ключа
     */
    async saveSetting(group, key, val) {        
        self.blue(".saveSetting")
        this.d(".saveSetting group:" + group + " key:" + key + " val:" + val);
        await db.asyncQuery("call sp_set_setting(?, ?, ?)",  [ group, key, val ], [1]);       
    }   
}


const self  = new Settings();
module.exports = self;