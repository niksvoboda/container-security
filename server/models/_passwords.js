const db       = require("../components/db.js");

/** Модель без процедур, с парметризацией, защищена от SQL иньекций */
class Passwords {


    async getPasswordsByUserID(user_id) {
        return await db.asyncQuery("SELECT password FROM tabl_last_passwords WHERE user_id = (?) ORDER BY created_dt DESC", [user_id], true); 
    }

    async addPassword(password, user_id) {
      //  this.d(".getRoles");
        return await db.asyncQuery("INSERT INTO tabl_last_passwords (password, user_id) VALUES (?, ?)", 
        [password, user_id]);
    }

}

module.exports = new Passwords();