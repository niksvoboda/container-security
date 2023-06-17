
const db       = require("../components/db_pg.js");


class Roles {

    name = "Roles";
    /**Пользовательская часть */
     async getEntrys(search) {
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT role_id, title, created_dt, changed_dt FROM tbl_users_roles 
        WHERE title LIKE $1
        ORDER BY role_id`, [search]);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        let result = await db.asyncQuery("SELECT * FROM tbl_users_roles WHERE role_id = $1", [id]);
        return result;
    }
    async getRoleByTitle(title) {
        let result = await db.asyncQuery("SELECT * FROM tbl_users_roles WHERE title = $1", [title]);
        return result;
    }

    
    async addEntry(
            title,
            permissions,
            creator_id) {
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
        let result = await db.asyncQuery("DELETE FROM tbl_users_roles WHERE role_id = $1", [id]);
        return result;
    }


}

module.exports = new Roles();