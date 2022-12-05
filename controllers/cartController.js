const { INTEGER } = require('sequelize');
const db = require('../models');
const RoomCart = db.RoomCart;
const RoomCartItem = db.RoomCartItem;
const User = db.User;
const Op = db.sequelize.Op;

// roomCartItem -> room cart 에 담기
exports.saveRoomCartItem = async (req, res) => {
    
    const userId = req.query.userId;

    // console.log(userId);
    // console.log(req.body);

    const findRoomCart = await RoomCart.findOne({
        include: [{
            model: User,
            where: {
                id: userId
            }
        }]
    });

    if(findRoomCart == null) {
        const newRoomCart = await RoomCart.create({
            users_id: userId
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating room cart."
              });
        })

        const newRoomCartItem = await RoomCartItem.create({
            room_carts_id: newRoomCart.id,
            image: req.body.image,
            brand: req.body.brand,
            link: req.body.link,
            lprice: req.body.lprice,
            category1: req.body.category1,
            category2: req.body.category2,
            category3: req.body.category3,
            category4: req.body.category4,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating room cart item."
              });
        })
    }else {
        const newRoomCartItem = await RoomCartItem.create({
            room_carts_id: findRoomCart.id,
            image: req.body.image,
            brand: req.body.brand,
            link: req.body.link,
            lprice: req.body.lprice,
            category1: req.body.category1,
            category2: req.body.category2,
            category3: req.body.category3,
            category4: req.body.category4,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating room cart item."
              });
        })
    }
}