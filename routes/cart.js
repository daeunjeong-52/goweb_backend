module.exports = app => {

    // 장바구니 - 로그인 한 사용자만
    const carts = require('../controllers/cartController');
    var router = require('express').Router();

    router.get("/rooms", carts.findRoomCart);

    router.post("/rooms/items", carts.saveRoomCartItem); // 장바구니 담기
    router.get("/rooms/items", carts.findRoomCartItemPaging); // 내 카트 목록
    router.get("/rooms/items/all", carts.findRoomCartItemAll); // 전체 개수

    router.delete("/rooms/items/:id", carts.deleteRoomCartItem); // 아이템 삭제

    app.use('/api/carts', router);
}