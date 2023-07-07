
const db    = require("../components/db_pg.js");
const Log   = require('../components/log.js');

class Containers  extends Log {
    name = "Containers";
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * FROM tbl_containers 
        WHERE container_id LIKE $1 
        OR  image LIKE $1 
        OR  command LIKE $1 
        OR  status LIKE $1 
        OR  ports LIKE $1 
        OR  _names LIKE $1 
        ORDER BY containers_id`, [search]);
        return result;
    }
    async getEntry(id) {
        self.blue(".getEntry")
        let result = await db.asyncQuery("SELECT * FROM tbl_containers WHERE containers_id = $1", [id]);
        return result;
    }
    async getContainerById(container_id) {
        self.blue(".getContainerById")
        let result = await db.asyncQuery("SELECT * FROM tbl_containers WHERE container_id = $1", [container_id]);
        return result;
    }    
    async addEntry(container_id, image, command, ports, status, _names) {
        self.blue(".addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_containers 
        ( container_id, image, command, ports, status,  _names) 
        VALUES ($1,$2,$3,$4,$5,$6)`,
         [ container_id, image, command, ports, status,  _names]);
        return result;
    }
    async updateEntry(
        container_id,
        image,
        command,
        created,
        status,
        ports,
        names,
        id) {
        self.blue(".updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_containers SET
        container_id = $1,
        image = $2,
        command = $3,
        created = $4,
        status = $5,
        ports = $6,
        _names = $7
        WHERE containers_id = $8`, [
        container_id,
        image,
        command,
        created,
        status,
        ports,
        names,
        id]);
        return result;
    }
    async deleteEntry(id) {
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_containers WHERE containers_id = $1", [id]);
        return result;
    }
}

const self  = new Containers();
module.exports = self;