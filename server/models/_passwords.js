const db    = require("../components/db_pg.js");
const Log   = require('../components/log');

/** Модель без процедур, с парметризацией, защищена от SQL иньекций */
class Passwords extends Log {
    name = "Passwords";
    async getPasswordsByUserID(user_id) {
        self.blue(".getPasswordsByUserID")
        return await db.asyncQuery("SELECT password FROM tabl_last_passwords WHERE user_id = (?) ORDER BY created_dt DESC", [user_id], true); 
    }

    async addPassword(password, user_id) {
        self.blue(".addPassword")
        return await db.asyncQuery("INSERT INTO tabl_last_passwords (password, user_id) VALUES (?, ?)", 
        [password, user_id]);
    }
}

const self  = new Passwords();
module.exports = self;
