module.exports = app => {

    const carts = require('../controllers/cartController');
    var router = require('express').Router();

    router.post("/room", carts.saveRoomCartItem);

    app.use('/api/carts', router);
}