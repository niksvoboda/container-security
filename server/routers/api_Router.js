const Router            = require('express');
const router            = new Router();

const Auth_Controller   =  require('../controllers/auth_Controller')
const Api_Users         = require('../controllers/api_Users')
const Api_System        = require('../controllers/api_System')
const Auth              = require('../middleware/auth_m_ware.js');

//auth
router.post('/login', Auth_Controller.login);
router.post('/logout', Auth_Controller.logout);
router.post('/check', Auth_Controller.check);

//
router.get('/translate', Api_System.getTranslate);

//users
router.get('/users/users', Auth, Api_Users.getEntrys);  
router.get('/users/user', Auth, Api_Users.getEntry);  
router.post('/users/user_add', Auth, Api_Users.addEntry);
router.post('/users/user_update', Auth,  Api_Users.updateEntry);
router.post('/users/user_delete', Auth,  Api_Users.deleteEntry);




module.exports = router