
const config        = require("config");
const cors          = require("cors");
const fs            = require("fs");
const https         = require("https");
const express       = require('express');

const app           = express();
const db            = require('./components/db');
const console_log   = require('./components/console_log');


class App {
    name = "App"
    constructor(app){       
        this.app = app;
        app.use(cors());
        /** Подключаем возможность обращения к нашему API с помощью JSON-запросов */
        app.use(express.json())
        /** Подключаем роутер API */
      //  app.use('/api', router)
        this.showSplash();
       // this.startClient();
        this.startServer();
    }

    showSplash() {
        const splash = [
            "\n", '-'.repeat(80),
            'Запуск системы учета объемов работ ' + config.get("version"),
            '-'.repeat(80)
        ];
     //   splash.forEach(line => this.w(line));
    }
    //Развертываем продакшн сборку фронта
    startClient(){
        const self  = this;
      //  this.d(".startClient");
        app.use(express.static(path.join(__dirname, './build')));
        app.get('/*', function (req, res) {
            self.d(".sendFrontend");
            res.sendFile(path.join(__dirname, './build', 'index.html'));
        });
    }
    async startServer() {
      
        try {
            const port      = config.get('server.port');
            const port_ssl  = config.get('server.port_ssl');
          //  this.d(".startServer port:" + port);
            this.app.listen(port, function() {
           //     self.w('Server running on http://localhost:' + port);
            });
           //Запускаем  SSL
            const options = {
                key: fs.readFileSync("./config/ssl/cert.key"),
               cert: fs.readFileSync("./config/ssl/cert.crt"),
              };
          //  this.d(".startServer port:" + port_ssl);
            https.createServer(options, this.app).listen((port_ssl), () => {
             //   self.w(`Server running on https://localhost:` + (port_ssl));
              });
             
              
             let sql = "SELECT * FROM tbl_users WHERE user_id = (?)"
             let params = [1]
             const  result = await db.asyncQuery(sql,params)

        } catch (error) {
            console.log(error)
        }  
    }
}

new App(app);