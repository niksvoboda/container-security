const db    = require("../components/db_pg.js");
const Log   = require('../components/log');

class Users extends Log {
    name = "Users";
    saltRounds = 10;

    async getUserByLoginWithRole(login) {
        self.blue('.getUserByLoginWithRole')
        const res = await db.asyncQuery('SELECT *, tbl_users_roles.permissions AS permissions FROM tbl_users INNER JOIN tbl_users_roles ON tbl_users_roles.role_id = tbl_users.role_id WHERE login=$1', [ login ]);
        return res ? res : null;
    }
   
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_users 
        WHERE username LIKE $1
        OR login LIKE $2
        OR position LIKE $3 
        ORDER BY user_id`, [search, search, search]);
        return result;
    }
 
    async getEntry(id) {
        self.blue("getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_users WHERE user_id = $1", [id]);
        return result;
    }

    async addEntry(      
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
            self.blue(".addEntry")
            console.log(
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
        let result = await db.asyncQuery(`INSERT INTO tbl_users 
        (   username, 
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
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
         [  username, 
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
            self.blue(".updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_users SET       
        username = $1, 
        login = $2, 
        role_id = $3, 
        position = $4, 
        phone_int = $5, 
        phone_mob = $6, 
        email = $7, 
        enabled = $8,
        rem  = $9
        WHERE user_id = $10`, [
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
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_users WHERE user_id = $1", [id]);
        return result;
    }

    async setUserPass(user_id, pass ) {
        self.blue(".setUserPass")
        const res = await db.asyncQuery(`UPDATE tbl_users SET password = $1  WHERE user_id = $2`, 
        [pass, user_id]);
    }

    async setAttempts(login, attempts ) {
        self.blue(".setAttempts")
        const res = await db.asyncQuery(`UPDATE tbl_users SET attempts = 1  WHERE login = $1`, 
        [login]);
    }
}
const self  = new Users();
module.exports = self;