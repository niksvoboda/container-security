const Router            = require('express');
const router            = new Router();

const Auth_Controller   = require('../controllers/auth_Controller')
const Api_Users         = require('../controllers/api_Users')
const Api_Roles         = require('../controllers/api_Roles')
const Api_System        = require('../controllers/api_System')
const Auth              = require('../middleware/auth_m_ware.js');

//auth
router.post('/login', Auth_Controller.login);
router.post('/logout', Auth_Controller.logout);

//scheduledjobs
router.get('/scheduledjobs/jobs', Auth, Api_Users.getEntrys);  
router.get('/scheduledjobs/job', Auth, Api_Users.getEntry);  
router.post('/scheduledjobs/job_add', Auth, Api_Users.addEntry);
router.post('/scheduledjobs/job_update', Auth,  Api_Users.updateEntry);
router.post('/scheduledjobs/job_delete', Auth,  Api_Roles.deleteEntry);

//translate
router.get('/translate', Api_System.getTranslate);

//users
router.get('/users/users', Auth, Api_Users.getEntrys);  
router.get('/users/user', Auth, Api_Users.getEntry);  
router.post('/users/user_add', Auth, Api_Users.addEntry);
router.post('/users/user_update', Auth,  Api_Users.updateEntry);
router.post('/users/user_delete', Auth,  Api_Users.deleteEntry);

//roles
router.get('/roles/roles', Auth, Api_Roles.getEntrys);  
router.get('/roles/role', Auth, Api_Roles.getEntry);  
router.post('/roles/role_add', Auth, Api_Roles.addEntry);
router.post('/roles/role_update', Auth,  Api_Roles.updateEntry);
router.post('/roles/role_delete', Auth,  Api_Roles.deleteEntry);

module.exports = router