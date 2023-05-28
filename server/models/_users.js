const db       = require("../components/db.js");
const Log       = require('../components/log');
class Users extends Log {
    name = "Users";
    saltRounds = 10;

    async getUserByLoginWithRole(login) {
        self.blue('getUserByLoginWithRole')
        const res = await db.asyncQuery("SELECT *, `tbl_users_roles`.permissions AS permissions FROM `tbl_users`  INNER JOIN `tbl_users_roles` ON tbl_users_roles.role_id = tbl_users.role_id WHERE login=(?)", [ login ]);
        return res ? res : null;
    }
   
     async getEntrys(search) {
        self.blue("getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_users 
        WHERE username LIKE (?)
        OR login LIKE (?)
        OR position LIKE (?)`, [search, search, search]);
        return result;
    }
 
    async getEntry(id) {
        self.blue("getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_users WHERE user_id = (?)", [id]);
        return result;
    }

    async addEntry(
        user_id, 
        username, 
        login, 
        password,
        role_id, 
        salt,
        position, 
        phone_int, 
        phone_mob, 
        email, 
        enabled,
        rem ) {
            self.blue("addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_users 
        (   user_id, 
            username, 
            login, 
            password,
            role_id, 
            salt,
            position, 
            phone_int, 
            phone_mob, 
            email, 
            enabled,
            rem) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
         [  user_id, 
            username, 
            login, 
            password,
            role_id, 
            salt,
            position, 
            phone_int, 
            phone_mob, 
            email, 
            enabled,
            rem]);
        return result;
    }
    async updateEntry(
        user_id, 
        username, 
        login, 
        role_id, 
        position, 
        phone_int, 
        phone_mob, 
        email, 
        enabled,
        rem ) {
            self.blue("updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_users SET       
        username = (?), 
        login = (?), 
        role_id = (?), 
        position = (?), 
        phone_int = (?), 
        phone_mob = (?), 
        email = (?), 
        enabled = (?),
        rem  = (?)
        WHERE user_id = (?)`, [
            username, 
            login, 
            role_id, 
            position, 
            phone_int, 
            phone_mob, 
            email, 
            enabled,
            rem, 
            user_id
        ]);
        return result;
    }
    async deleteEntry(id) {
        self.blue("deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_users WHERE user_id = (?)", [id]);
        return result;
    }

    async setUserPass(user_id, pass ) {
        self.blue("setUserPass")
        const res = await db.asyncQuery(`UPDATE tbl_users SET password = (?)  WHERE user_id = (?)`, 
        [pass, user_id]);
       // return res.length ? res[0] : res;
    }

    async setAttempts(login, attempts ) {
        self.blue("setAttempts")
        const res = await db.asyncQuery(`UPDATE tbl_users SET attempts = 1  WHERE login = (?)`, 
        [login]);
       // return res.length ? res[0] : res;
    }


}
const self  = new Users();
module.exports = self;