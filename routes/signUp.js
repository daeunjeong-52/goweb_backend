module.exports = app => {

    const users = require('../controllers/userController.js');

    var router = require('express').Router();

    router.post("/sign-up", users.signUp);

    app.use('/api', router);
}