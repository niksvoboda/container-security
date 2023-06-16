
const config        = require("config");
const cors          = require("cors");
const fs            = require("fs");
const https         = require("https");
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
        app.use(express.json())
        /** Подключаем роутер API */
        app.use('/api', router)
        this.showSplash();
       // this.startClient();
        this.startServer();
        // this.scanPort();
        this.checkLdap();
    }

    showSplash() {
        const splash = [
            "\n", '-'.repeat(80),
            'Запуск системы мониторинга уязвимостей докер-контейнеров ' + config.get("version"),
            '-'.repeat(80)
        ];
        splash.forEach(line => console.log(this.clc.yellow(line)));
        
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
                //this.yellow('Server running on http://localhost:' + splash);           
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
        } catch (error) {
           console.log(error)
        }  
    }

async scanPort() {      
const net = require('net');
const ipAddress = '192.168.0.11'; // замените на нужный IP-адрес
const portsToScan = [80, 443, 22, 3306]; // список портов для сканирования

// Функция для проверки порта на наличие открытого соединения
function checkPort(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, ipAddress);
  });
}

// Функция для сканирования портов и определения протоколов
async function scanPorts() {
  const results = {};
  for (const port of portsToScan) {
    const isOpen = await checkPort(port);
    if (isOpen) {
      let protocol;
      switch (port) {
        case 80:
          protocol = 'HTTP';
          break;
        case 443:
          protocol = 'HTTPS';
          break;
        case 22:
          protocol = 'SSH';
          break;
        case 3306:
          protocol = 'MySQL';
          break;
        default:
          protocol = 'unknown';
      }
      results[port] = protocol;
    }
  }
  return results;
}

// Вызов функции сканирования и вывод результатов в консоль
scanPorts().then((results) => {
  console.log(`IP-адрес: ${ipAddress}`);
  console.log('Открытые порты:');
  for (const port in results) {
    console.log(`${port}: ${results[port]}`);
  }
});
    }

  
async checkLdap2(){
  const LdapAuth = require('ldapauth-fork');

  const  ldap_bacup= new LdapAuth({
    url: 'ldap://its.local:389',
    bindDN: 'cn=Администратор, dc=its, dc=local',
    bindCredentials: 'ПочемуМыЕщеЖивы?',
    searchBase: 'ou=users,dc=its,dc=local',
    searchFilter: '(uid={{Администратор}})'
  });

  const ldap = new LdapAuth({
    url: 'ldap://its.local:389',
    bindDN: 'uid=testad, ou=users, dc=its, dc=local',
    bindCredentials: '!QAZ2wsx',
    searchBase: 'ou=users,dc=its,dc=local',
    searchFilter: '(uid={{testad}})'
  });

  ldap.authenticate("testad", '!QAZ2wsx', function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
  }

  async checkLdap1(){
    const ldap = require('ldapjs');

    const ldapUrl = 'ldap://its.local:389';
    const adminDn = 'cn=Администратор,dc=its,dc=local';
    const adminPassword = 'ПочемуМыЕщеЖивы?';
    
    function authenticate(username, password) {
      const client = ldap.createClient({
        url: ldapUrl
      });
    
      const userDn = `uid=${username},ou=users,dc=its,dc=local`;
    
      return new Promise((resolve, reject) => {
        client.bind(adminDn, adminPassword, (err) => {
          if (err) {
            return reject(err);
          }
    
          client.search(userDn, (err, res) => {
            if (err) {
              return reject(err);
            }
    
            let foundUser = false;
    
            res.on('searchEntry', (entry) => {
              foundUser = true;
              client.bind(entry.dn.toString(), password, (err) => {
                if (err) {
                  return reject(err);
                }
                client.unbind();
                resolve(true);
              });
            });
    
            res.on('end', () => {
              if (!foundUser) {
                reject(`User ${username} not found`);
              }
            });
          });
        });
      });
    }
    
    authenticate('testad', '!QAZ2wsx').then(() => {
      console.log('Authentication successful');
    }).catch((err) => {
      console.error(err);
    });  
  }
  async checkLdap(){

    const client = ldap.createClient({
     url: 'ldap://10.10.1.49:389',
     // url: 'ldap://127.0.0.1:389',
    });
    client.bind('Администратор', 'ПочемуМЫЕщеЖивы?', (err) => {
      if (err) throw err;
      console.log('Successfully authenticated');
    });

    client.search('ou=users, dc=metal, dc=local', { filter: '(cn=Администратор)' }, (err, res) => {
      if (err) throw err;
    
      res.on('searchEntry', (entry) => {
        console.log('Found user:', entry.object);
      });
    
      res.on('error', (err) => {
        console.error('Error searching for user', err);
      });
    
      res.on('end', () => {
        console.log('Search finished');
      });
    });

    client.unbind((err) => {
      if (err) throw err;
      console.log('Connection closed');
    });



  }
}

new App(app);