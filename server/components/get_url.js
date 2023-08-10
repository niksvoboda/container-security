const Axios  = require('axios')
const Log    = require('./log');

class Axios extends Log{
    name = "Api_Containers";
    async request(req, res){
        const $authHost = Axios.create({
            baseURL: payment_url
        })
        
        const authInterceptor = config => {
            config.headers.authorization = 'Token ' + api_key
            return config
        }
        $authHost.interceptors.request.use(authInterceptor) 
        }
    }
module.exports = new Axios();