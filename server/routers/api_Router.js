const Router            = require('express');
const router            = new Router();

const Auth              = require('../middleware/auth_m_ware.js')
const Auth_Controller   = require('../controllers/auth_Controller')
const Api_Users         = require('../controllers/api_Users')
const Api_Roles         = require('../controllers/api_Roles')
const Api_System        = require('../controllers/api_System')
const Api_Containers    = require('../controllers/api_Containers')
const Api_Images        = require('../controllers/api_Images')
const Api_Operation_console   = require('../controllers/api_Operation_console')

//auth 
router.post('/login',  Auth_Controller.login);
router.post('/logout', Auth_Controller.logout);

//operationconsoles
router.get('/operationconsoles/jobs',        Auth, Api_Operation_console.getEntrys);  
router.get('/operationconsoles/job',         Auth, Api_Operation_console.getEntry);  
router.post('/operationconsoles/job_add',    Auth, Api_Operation_console.addEntry);
router.post('/operationconsoles/job_update', Auth, Api_Operation_console.updateEntry);
router.post('/operationconsoles/job_delete', Auth, Api_Operation_console.deleteEntry);

//translate
router.get('/translate', Api_System.getTranslate);

//users
router.get('/users/users',        Auth, Api_Users.getEntrys);  
router.get('/users/user',         Auth, Api_Users.getEntry);  
router.post('/users/user_add',    Auth, Api_Users.addEntry);
router.post('/users/user_update', Auth, Api_Users.updateEntry);
router.post('/users/user_delete', Auth, Api_Users.deleteEntry);

//roles
router.get('/roles/roles',        Auth, Api_Roles.getEntrys);  
router.get('/roles/role',         Auth, Api_Roles.getEntry);  
router.post('/roles/role_add',    Auth, Api_Roles.addEntry);
router.post('/roles/role_update', Auth, Api_Roles.updateEntry);
router.post('/roles/role_delete', Auth, Api_Roles.deleteEntry);

//containers
router.get('/containers/containers',        Auth, Api_Containers.getEntrys);  
router.get('/containers/container',         Auth, Api_Containers.getEntry);  
router.post('/containers/container_add',    Auth, Api_Containers.addEntry);
router.post('/containers/container_update', Auth, Api_Containers.updateEntry);
router.post('/containers/container_delete', Auth, Api_Containers.deleteEntry);

//images
router.get('/images/images',        Auth, Api_Images.getEntrys);
router.get('/images/image',         Auth, Api_Images.getEntry);
router.post('/images/image_add',    Auth, Api_Images.addEntry);
router.post('/images/image_update', Auth, Api_Images.updateEntry);
router.post('/images/image_delete', Auth, Api_Images.deleteEntry);

module.exports = router