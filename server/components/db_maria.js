const mysql = require("mysql2");
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
            config.get('db.host'),            
            config.get('db.port'),
            config.get('db.user'),            
            config.get('db.password'),
            config.get('db.database'),
            config.get('db.connectionLimit'),
            config.get('db.charset'),
            config.get('db.multipleStatements'),            
            config.get('db.maxIdle'),
            config.get('db.idleTimeout'),
            config.get('db.queueLimit'),              
        )
    }
    // Create the connection pool. The pool-specific settings are the defaults
    createPool(host, port, user, password, database, connectionLimit, charset, multipleStatements, maxIdle, idleTimeout, queueLimit){        
       try {
         const  pool = mysql.createPool({
            host,
            port,
            user,            
            password,   
            database,          
            connectionLimit,
            charset,
            multipleStatements, 
            maxIdle, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit
            });            
            const promisePool = pool.promise(); 
            return promisePool
       } catch (error) {
            console.log(error)
       }
    }

    async asyncQuery(sql, params = []){
        // For pool initialization, see above
        let result = [];
        try {        
            const [rows, fields, error] = await  this.poolConnections.query(sql, params);
            result = rows 
        return result           
        } catch (error) {
            result[0] = {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage,
                sql: error.sql,
            }
          console.log(error)
          return result
        }  
    }
}

module.exports = new Db();