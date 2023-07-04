
const db    = require("../components/db_pg.js");
const Log   = require('../components/log');

class Images  extends Log {
    name = "Images";
     async getEntrys(search) {
        self.blue(".getEntrys")
        search = '%' + search + '%';
        let result = await db.asyncQuery(`SELECT * 
        FROM tbl_images
        WHERE image_id LIKE $1 
        OR  repository LIKE $1 
        OR  tag LIKE $1
        ORDER BY images_id`, [search]);
        return result;
    }
    async getEntry(id) {
        self.blue(".getEntry")
        let result = await db.asyncQuery(`SELECT * FROM tbl_images WHERE images_id = $1`, [id]);
        return result;
    }
    async getImageById(image_id) {
        image_id = '%' + image_id + '%';
        self.blue(".getImageById")
        let result = await db.asyncQuery(`SELECT * FROM tbl_images WHERE image_id LIKE $1`, [image_id]);
        return result;
    }    
    async addEntry(
        image_id,
        repository,
        tag,
        size) {
        self.blue(".addEntry")
        let result = await db.asyncQuery(`INSERT INTO tbl_images 
        (   image_id,
            repository,
            tag,
            size) 
        VALUES ($1,$2,$3,$4)`,
         [  image_id,
            repository,
            tag,
            size]);
        return result;
    }
    async updateEntry( image_id, repository,  tag, size, id) {
        self.blue(".updateEntry")
        let result = await db.asyncQuery(`UPDATE tbl_images SET
        image_id    = $1,
        repository   = $2,
        tag  = $3,
        size = $4
        WHERE images_id = $5`, [ image_id, repository, tag, size, id]);
        return result;
    }
    async deleteEntry(id) {
        self.blue(".deleteEntry")
        let result = await db.asyncQuery("DELETE FROM tbl_images WHERE images_id = $1", [id]);
        return result;
    }
}

const self  = new Images();
module.exports = self;