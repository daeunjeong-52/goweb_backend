module.exports = app => {

    const carts = require('../controllers/cartController.js');
    var router = require('express').Router();

    // router.get('/rooms/all', showPosts.findRoomAll);

    app.use('/api/', router);
}