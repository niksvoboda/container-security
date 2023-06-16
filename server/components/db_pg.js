const { Pool } = require('pg')
const config = require("config");
const Log   = require('./log');
/**
 * Класс для доступа к БД
 */
class Db extends Log{
    name = "Db";
    constructor(){
        super();
        this.poolConnections = this.createPool(
            config.get('db_pg.user'), 
            config.get('db_pg.host'),  
            config.get('db_pg.database'),
            config.get('db_pg.password'),          
            config.get('db_pg.port'),
            config.get('db_pg.connectionLimit'),
            config.get('db_pg.idleTimeout'),        
        )
    }
    
    // Create the connection pool. The pool-specific settings are the defaults
    createPool(user, host,  database, password, port, connectionLimit, idleTimeout){        
        try {
            const pool = new Pool({
                user:  user, 
                host:  host, 
                database:  database, 
                password:  password, 
                port:  port, 
                max: connectionLimit,  // максимальное количество клиентов в пуле
                idleTimeoutMillis: idleTimeout,  // время в миллисекундах, после которого свободный клиент будет закрыт
              }) 
             return pool
        } catch (error) {
             console.log(error)
        }
    }

    async asyncQuery(sql, params = []){
        // For pool initialization, see above
        let result = [];
        try {        
            await this.poolConnections
                .query(sql, params)
                .then((res) => {
                    result = res.rows
                    }
                ) 
                .catch((error) => {        
                    result = [{
                        message: error.message,
                        length: error.length,
                        code: error.code
                        }]
                })            
        return result           
        } catch (error) {            
          console.error(error)          
          return error
        }  
    }
}

module.exports = new Db();