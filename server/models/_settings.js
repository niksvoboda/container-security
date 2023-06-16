const db  = require("../components/db_pg.js");

class Settings {

    name = "Settings";

    /**
     * Возвращает список ключей секции настроек
     * @returns array           Список параметров
     */
    async getEntrysByGroup(group) {
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
        this.d(".saveSetting group:" + group + " key:" + key + " val:" + val);
        await db.asyncQuery("call sp_set_setting(?, ?, ?)",  [ group, key, val ], [1]);
       
    }   

}

module.exports = new Settings();