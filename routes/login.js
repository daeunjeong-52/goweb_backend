module.exports = app => {

    const users = require('../controllers/userController.js');

    var router = require('express').Router();

    router.post("/sign-up", users.signUp);

    // TODO
    router.post("/login", users.login);

    app.use('/api', router);
}