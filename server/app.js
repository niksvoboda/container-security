
const config        = require("config");
const cors          = require("cors");
const fs            = require("fs");
const https         = require("https");
const path          = require("path");
const express       = require('express');
const router        = require("./routers/api_Router");
const app           = express();
const Log           = require("./components/log");
const ldap          = require('ldapjs');


class App extends Log {
  name = "App"
  constructor(app){
      super();
      this.app = app;
      app.use(cors());
      /** Подключаем возможность обращения к нашему API с помощью JSON-запросов */       
      app.use(express.json({ limit: '500kb' }));
      app.use('/avatars', express.static(path.resolve(__dirname, 'static', 'avatars')))      
      app.use('/actions', express.static(path.resolve(__dirname, 'static', 'actions'))) 
      app.use('/pdf',     express.static(path.resolve(__dirname, 'static', 'pdf')))    
     // app.use(fileUpload({}))
     // app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }, }));
      /** Подключаем роутер API */
      app.use('/api', router)
      this.showSplash();
      this.startClient();
      this.startServer();      
  }

  showSplash() {
      const splash = [
          "\n", '-'.repeat(80),
          'Запуск системы ' + config.get("version"),
          '-'.repeat(80)
      ];
      splash.forEach(line => this.yellow(line));
  }
  //Развертываем продакшн сборку фронта
  startClient(){
      const self  = this;
      this.green(".startClient");
      app.use(express.static(path.join(__dirname, './build')));
      app.get('/*', function (req, res) {
          self.d(".sendFrontend");
          res.sendFile(path.join(__dirname, './build', 'index.html'));
      });
  }
  async startServer() {
      const self = this;
      try {
          const port      = config.get('server.port');
          const port_ssl  = config.get('server.port_ssl');
          this.green(".startServer port:" + port);
          this.app.listen(port, function() {
              self.yellow('.Server running on http://localhost:' + port);
          });
         //Запускаем  SSL
          const options = {
              key: fs.readFileSync("./config/ssl/cert.key"),
             cert: fs.readFileSync("./config/ssl/cert.crt"),
            };
          this.green(".startServer port:" + port_ssl);
          https.createServer(options, this.app).listen((port_ssl), () => {
              self.yellow(`.Server running on https://localhost:` + (port_ssl));
            });
      } catch (error) {
          console.log(error)
      }  
  }

}

new App(app);