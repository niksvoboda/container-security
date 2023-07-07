const Log = require("../../components/log")


class ImportImages extends Log {
    name = "Api_Images";
        async ImportImages(){
            self.green("ImportImages");
        }
}


const self  = new ImportImagesContainers();
module.exports = self;