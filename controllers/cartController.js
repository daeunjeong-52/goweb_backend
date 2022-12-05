const { INTEGER } = require('sequelize');
const db = require('../models');
const Cart = db.Cart;
const CartItem = db.CartItem;
const User = db.User;
const Op = db.sequelize.Op;

// find room cart
exports.findRoomCart = async (req, res) => {

    const userId = req.query.userId;

    Cart.findOne({
        include: [{
            model: User,
            where: {
                id: userId,
            }
        }],
        where: {
            category: "room"
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving room cart."
          });
    })
}

// roomCartItem -> room cart 에 담기
exports.saveRoomCartItem = async (req, res) => {
    
    const userId = req.query.userId;

    // console.log(userId);
    // console.log(req.body);

    const findRoomCart = await Cart.findOne({
        include: [{
            model: User,
            where: {
                id: userId
            }
        }],
        where: {
            category: "room",
        },
    });

    // console.log(findRoomCart.id);

    // 새로운 room cart 생성
    if(findRoomCart == null) {
        const newRoomCart = await Cart.create({
            users_id: userId,
            category: "room"
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

        const newRoomCartItem = await CartItem.create({
            carts_id: newRoomCart.id,
            image: req.body.image,
            brand: req.body.brand,
            link: req.body.link,
            lprice: req.body.lprice,
            category1: req.body.category1,
            category2: req.body.category2,
            category3: req.body.category3,
            category4: req.body.category4,
            category: "room"
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
        const newRoomCartItem = await CartItem.create({
            carts_id: findRoomCart.id,
            image: req.body.image,
            brand: req.body.brand,
            link: req.body.link,
            lprice: req.body.lprice,
            category1: req.body.category1,
            category2: req.body.category2,
            category3: req.body.category3,
            category4: req.body.category4,
            category: "room"
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

// findAll - room cart
exports.findRoomCartItemAll = async (req, res) => {
    const userId = req.query.userId;

    const findRoomCart = await Cart.findOne({
        include: [{
            model: User,
            where: {
                id: userId,
            }
        }],
        where: {
            category: "room"
        }
    });

    console.log(findRoomCart.id);

    CartItem.findAll({
        where: {
            carts_id: findRoomCart.id
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving room cart item."
          });
    })
}