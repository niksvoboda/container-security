const Router            = require('express');
const router            = new Router();

const Auth_Controller   =  require('../controllers/auth_Controller')
const Api_Users         = require('../controllers/api_Users')

//auth
router.post('/login', Auth_Controller.login);
router.post('/logout', Auth_Controller.logout);
router.post('/check', Auth_Controller.check);

//users
router.get('/users/users', Api_Users.getEntrys);  
router.get('/users/user',  Api_Users.getEntry);  
router.post('/users/user_add',  Api_Users.addEntry);
router.post('/users/user_update',  Api_Users.updateEntry);
router.post('/users/user_delete',  Api_Users.deleteEntry);


module.exports = router