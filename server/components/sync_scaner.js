const db     = require("./db_pg.js");
const Log    = require("./log.js");
const axios  = require("axios")
const config = require("config");

class Sync_Scaner extends Log {     
    name = "Sync_Scaner";
    async Sync() {
      try {
        /** Узнаем статус сканера */
        const host = config.get("scnaner.host")
        const url = `${host}/execute_script`;
        const response = await axios.get(url);
        const data = response.data;    
        console.log(data);

        /** Получаем ожидающие задачи сканирования отсортированые по возрастанию ID*/

        /** Если сканер свободен со статусом 0 то запускаем в работу задачу */

        /** Если сканер свободен со статусом 1 или 2 то  */

        
      } catch (error) {
        console.log(error)
      }
    }

    async autoSyncCharges(){
        let polling_time = 5000;
        this.Sync();
        /** Устанавливаем время следующего вызова */
        setTimeout(()=>{
            this.autoSyncCharges();
        }, polling_time );
      //  this.d(`.interval:`,`${polling_time}seconds`);
    }
}

module.exports = new Sync_Scaner();