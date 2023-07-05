
const db    = require("../components/db_pg.js");
const Log   = require('../components/log');

class Tasks  extends Log {
    name = "Tasks";
    /**Пользовательская часть */
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_tasks 
        WHERE title LIKE $1
        ORDER BY task_id`, [search]);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        self.blue(".getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_tasks WHERE task_id = $1", [id]);
        return result;
    }

    async addEntry(
            title,
            permissions,
            creator_id) {
        self.blue(".addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_tasks 
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
        let result = await db.asyncQuery(`UPDATE tbl_tasks SET
            title    = $1,
            permissions   = $2,
            creator_id  = $3
            WHERE task_id = $4`, [
            title,
            permissions,
            creator_id,
            id,
            ]);
        return result;
    }
    async deleteEntry(id) {
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_tasks WHERE task_id = $1", [id]);
        return result;
    }
}

const self  = new Tasks();
module.exports = self;