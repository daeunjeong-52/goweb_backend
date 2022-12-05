const db = require('../models');
const RoomCart = db.RoomCart;
const RoomCartItem = db.RoomCartItem;
const Op = db.sequelize.Op;

// roomCartItem -> room cart 에 담기
exports.saveRoomCartItem = (req, res) => {
    console.log(req.query.userId);
}