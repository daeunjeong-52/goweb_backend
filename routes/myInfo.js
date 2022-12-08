module.exports = app => {

    const carts = require('../controllers/cartController.js');
    var router = require('express').Router();

    app.use('/api/', router);
}