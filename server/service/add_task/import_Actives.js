const Log           = require("../../components/log")
const Containers    = require("../../models/_containers"); 
const Images        = require("../../models/_images"); 

class ImportActives extends Log {
    name = "ImportActives";

    async ImportContainers(containers){
        self.yellow("ImportContainers");
        let counterAdd = 0;
        let counterUpdate = 0;
        if(containers?.length>0){
            for (const iterator of containers) {
                try {
                // Проверяем на наличие в бд                     
                const result = await Containers.getContainerById(iterator[0])  
                   // console.log(result)            
                if (result?.length>0) {
                    counterUpdate++
                // написать сюда обновление записи      
                } else {
                //вставка записи
                    counterAdd++;
                const result =  await Containers.addEntry(iterator[0],iterator[1], iterator[2], '--','--', '--') 
                //container_id, image, command, ports, _names
                }} catch (error) {
                    console.log(error)      
                }
            }
        }
        return {counterAdd, counterUpdate}
    }

    async ImportImages(images){
        self.yellow("ImportImages");      
        let counterAdd = 0;
        let counterUpdate = 0;
        if(images?.length>0){
            for (const iterator of images) {
                try {
                // Проверяем на наличие в бд                     
                const result = await Images.getImageById(iterator[2])  
                  //  console.log(result)            
                if (result?.length>0) {
                    counterUpdate++
                // написать сюда обновление записи      
                } else {
                //вставка записи
                    counterAdd++;
                const result =  await Images.addEntry(iterator[2],iterator[0], iterator[1], '--') //data.image_id, data.repository, data.tag, data.size
                }} catch (error) {
                    console.log(error)      
                }
            }
        }
        return {counterAdd, counterUpdate}
    }
}
const self  = new ImportActives();
module.exports = self;