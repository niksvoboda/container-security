const bcrypt   = require('bcrypt');
const db       = require("../components/db.js");

class Users {

    name = "Users";
    saltRounds = 10;
    /** Для авторизации */
    async getUserByLoginWithRole(login) {
        const res = await db.asyncQuery("SELECT *, `tbl_users_roles`.permissions AS permissions FROM `tbl_users`  INNER JOIN `tbl_users_roles` ON tbl_users_roles.role_id = tbl_users.role_id WHERE login=(?)", [ login ]);
        return res ? res : null;
    }
    /**
     * Проверка переденного пороля и хеша пароля из БД
     * @param string password       Проверяемый пароль
     * @param string passwordHash   Хэш пароля
     * @returns boolean             Соответствует ли пароль хешу
     */
    async checkPassword(password, passwordHash) {
    
        return await bcrypt.compare(password, passwordHash);
    }


    /**Пользовательская часть */
     async getEntrys(search) {
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_users 
        WHERE username LIKE (?)
        OR login LIKE (?)
        OR position LIKE (?)`, [search, search, search], 1);
        return result;
    }
    /** Для формы редактирования */
    async getEntry(id) {
        let result = await db.asyncQuery("SELECT * FROM tbl_requests WHERE request_id = (?)", [id]);
        return result;
    }

    async getEntryStatus(request_status) {
        //this.d(".getEntry");
        let result = await db.asyncQuery("SELECT COUNT(*) AS count FROM tbl_requests WHERE request_status = (?)", [request_status]);
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

    createPasswordHash(passwd) {
        const salt = bcrypt.genSaltSync(this.saltRounds);
        return bcrypt.hashSync(passwd, salt);
    }


}

module.exports = new Users();