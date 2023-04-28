/**
 * Класс для логирования в консоль из кода
 */
const config = require("config");

class Console_Log{ 
    name = "Console_Log"
    constructor() {
        /** подключаем библиотеку окраски текста в консоли */
        this.clc        = require("cli-color");
        /** назначаем типовые цвета  */
       // this.error      = this.clc.red.bold;
        this.warn       = this.clc.yellow;
        this.notice     = this.clc.blue;
        this.error_bg      = this.clc.xterm(202).bgXterm(1);
       // console.log(msg("Orange text on dark gray background"));
        /** Если в конфиге логирование включено то делаем доступные сообщения в консоль */
        config.get('log.console') == 'true' ? this.enable = true : false;
    }
    
    green(name, func, args=[]) {
        if (this.enable) {
            console.log(`${this.clc.greenBright(name)}.${func} ${args}`);           
        }
    }

    yellow(name, func, args=[]) {
        if (this.enable) {
            console.log(`${this.clc.yellow(name)}.${func} ${args}`);   
        }
    }

    blue(name, func, args=[]) {
        if (this.enable) {
            console.log(`${this.clc.blue(name)}.${func} ${args}`);   
        }
    }

    error(name, func, args=[]) {
        if (this.enable) {
            console.log(`${this.error_bg(name)}.${func} ${args}`);   
        }
    }

}

module.exports = new Console_Log();