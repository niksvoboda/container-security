
const db    = require("../components/db_pg.js");
const Log   = require('../components/log.js');

class Ldap_Roles  extends Log {
    name = "Roles";
    /**Пользовательская часть */
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_ad_users_roles 
        WHERE title LIKE $1
        ORDER BY ad_role_id`, [search]);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        self.blue(".getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_ad_users_roles WHERE ad_role_id = $1", [id]);
        return result;
    }
    async getRoleByTitle(title) {
        self.blue(".getRoleByTitle")
        let result = await db.asyncQuery("SELECT * FROM tbl_ad_users_roles WHERE title = $1", [title]);
        return result;
    }

    async addEntry(
        title,
        ad_groupname,
        local_role_id) {
        self.blue(".addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_ad_users_roles 
        (   title,
            ad_groupname,
            local_role_id) 
        VALUES ($1,$2,$3)`,
         [  title,
            ad_groupname,
            local_role_id]);
        return result;
    }
    async updateEntry(
        title,
        ad_groupname,
        local_role_id,
        id) {
        self.blue(".updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_ad_users_roles SET
            title    = $1,
            ad_groupname   = $2,
            local_role_id  = $3
            WHERE ad_role_id = $4`, [
            title,
            ad_groupname,
            local_role_id,
            id,
            ]);
        return result;
    }
    async deleteEntry(id) {
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_ad_users_roles WHERE ad_role_id = $1", [id]);
        return result;
    }
}

const self  = new Ldap_Roles();
module.exports = self;