
const db    = require("../components/db_pg.js");
const Log   = require('../components/log');

class Roles  extends Log {
    name = "Roles";
    /**Пользовательская часть */
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT role_id, title, created_dt, changed_dt FROM tbl_users_roles 
        WHERE title LIKE $1
        ORDER BY role_id`, [search]);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        self.blue(".getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_users_roles WHERE role_id = $1", [id]);
        return result;
    }
    async getRoleByTitle(title) {
        self.blue(".getRoleByTitle")
        let result = await db.asyncQuery("SELECT * FROM tbl_users_roles WHERE title = $1", [title]);
        return result;
    }

    async addEntry(
            title,
            permissions,
            creator_id) {
        self.blue(".addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_users_roles 
        (   title,
            permissions,
            creator_id) 
        VALUES ($1,$2,$3)`,
         [  title,
            permissions,
            creator_id]);
        return result;
    }
    async updateEntry(
        title,
        permissions,
        creator_id,
        id) {
        self.blue(".updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_users_roles SET
            title    = $1,
            permissions   = $2,
            creator_id  = $3
            WHERE role_id = $4`, [
            title,
            permissions,
            creator_id,
            id,
            ]);
        return result;
    }
    async deleteEntry(id) {
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_users_roles WHERE role_id = $1", [id]);
        return result;
    }
}

const self  = new Roles();
module.exports = self;