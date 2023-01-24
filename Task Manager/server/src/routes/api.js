const express              = require('express');
const router               = express.Router();
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const UsersController      = require('../controllers/UsersController');
const TasksController      = require('../controllers/TasksController');

// Users
router.post('/registration', UsersController.registration);
router.post('/login', UsersController.login);
router.post('/profileUpdate', AuthVerifyMiddleware, UsersController.profileUpdate);
router.get('/profileDetails', AuthVerifyMiddleware, UsersController.profileDetails);

// Recover Account
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

// Tasks
router.post('/createTask', AuthVerifyMiddleware, TasksController.createTask);
router.get('/deleteTask/:id', AuthVerifyMiddleware, TasksController.deleteTask);
router.get('/updateTaskStatus/:id/:status', AuthVerifyMiddleware, TasksController.updateTaskStatus);
router.get('/listTaskByStatus/:status', AuthVerifyMiddleware, TasksController.listTaskByStatus);
router.get('/taskStatusCount', AuthVerifyMiddleware, TasksController.taskStatusCount);

module.exports = router;