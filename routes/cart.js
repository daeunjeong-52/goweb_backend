module.exports = app => {

    const carts = require('../controllers/cartController');
    var router = require('express').Router();

    router.get("/rooms", carts.findRoomCart);

    router.post("/rooms/items", carts.saveRoomCartItem); // 장바구니 담기
    router.get("/rooms/items", carts.findRoomCartItemAll); // 내 카트 목록

    app.use('/api/carts', router);
}