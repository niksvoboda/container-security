
const db       = require("../components/db_pg.js");


class Roles {

    name = "Roles";
    /**Пользовательская часть */
     async getEntrys(search) {
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT role_id, title, created_dt, changed_dt FROM tbl_users_roles 
        WHERE title LIKE (?)`, [search]);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        let result = await db.asyncQuery("SELECT * FROM tbl_users_roles WHERE request_id = (?)", [id]);
        return result;
    }

    async addEntry(
        address,
        host_id,
        config_name,
        service_description,
        request_type,
        request_status,
        contacts,
        creator_id ) {
        let result = await db.asyncQuery(`INSERT INTO tbl_requests 
        (   address,
            host_id,
            config_name,
            service_description,
            request_type,
            request_status,
            contacts,
            creator_id) 
        VALUES (?,?,?,?,?,?,?,?)`,
         [  address,
            host_id,
            config_name,
            service_description,
            request_type,
            request_status,
            contacts,
            creator_id]);
        return result;
    }
    async updateEntry(
        address,
        host_id,
        config_name,
        service_description,
        request_type,
        request_status,
        contacts,
        id) {
        let result = await db.asyncQuery(`UPDATE tbl_requests SET
            address    = (?),
            host_id   = (?),
            config_name  = (?), 
            service_description  = (?),
            request_type  = (?),
            request_status  = (?),
            contacts  = (?)
            WHERE request_id = (?)`, [
            address,
            host_id,    
            config_name,
            service_description,
            request_type,
            request_status,
            contacts, 
            id,
        ]);
        return result;
    }
    async deleteEntry(id) {
        let result = await db.asyncQuery("DELETE FROM tbl_requests WHERE request_id = (?)", [id]);
        return result;
    }


}

module.exports = new Roles();