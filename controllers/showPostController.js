const db = require('../models');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ShowPost = db.ShowPost;
const RoomItem = db.RoomItem;
const FoodItem = db.FoodItem;
const Op = db.sequelize.Op;

// ShowPost 전체 조회
exports.findAll = (req, res) => {
    ShowPost.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'some error occurred while retrieving show posts'
            });
        });
}

// ShowPost - Room 카테고리 조회
exports.findRoomAll = (req, res) => {

    ShowPost.findAll({
        where: {
            category: "room"
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retrieving show room posts'
        });
    });
}

// ShowPost - Food 카테고리 조회
exports.findFoodAll = (req, res) => {

    ShowPost.findAll({
        where: {
            category: "food"
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retrieving show room posts'
        });
    });
}

// room 4개 (좋아요 정렬)
exports.findRoomTop4 = (req, res) => {

    ShowPost.findAll({
        where: {
            category: "room"
        },
        order:[['like', 'DESC']],
        limit: 4,
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show rooms main'
        })
    })
}

// food 4개 (좋아요 정렬)
exports.findFoodTop4 = (req, res) => {

    ShowPost.findAll({
        where: {
            category: "food",
        },
        order: [['like', 'DESC']],
        limit: 4,
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show foods main'
        })
    })
}

// ShowPost - Room (9개 페이징)
exports.findRoomPaging = (req, res) => {
    const currentPage = req.query.currentPage;
    const perPage = req.query.perPage;

    const offset = (currentPage - 1) * Number(perPage);
    const limit = Number(perPage);

    ShowPost.findAll({
        where: {
            category: "room"
        },
        offset: offset,
        limit: limit,
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show rooms main'
        })
    })
}

// ShowPost - Food (9개 페이징)
exports.findFoodPaging = (req, res) => {
    const currentPage = req.query.currentPage;
    const perPage = req.query.perPage;

    const offset = (currentPage - 1) * Number(perPage);
    const limit = Number(perPage);

    ShowPost.findAll({
        where: {
            category: "food"
        },
        offset: offset,
        limit: limit,
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show rooms main'
        })
    })
}

// findAll - roomItem (show post 상세)
exports.findRoomWithItem = (req, res) => {

    const id = req.params.id;
    console.log(id);

    ShowPost.findAll({
        where: {
            category: "room",
            id: id
        },
        include: [{
            model: RoomItem
        }]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show rooms main'
        })
    })
}

// findAll - foodItem (show post 상세)
exports.findFoodWithItem = (req, res) => {

    const id = req.params.id;

    ShowPost.findAll({
        where: {
            category: "food",
            id: id
        },
        include: [{
            model: FoodItem
        }]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retreving show rooms main'
        })
    })
}

// findAll - my-posts
exports.findMyPosts = (req, res) => {

    if(req.cookies && req.cookies.token) {
        const decoded = jwt.verify(req.cookies.token, "abc1234567");
        const userId = decoded.id;

        const currentPage = req.query.currentPage;
        const perPage = req.query.perPage;

        const offset = (currentPage - 1) * Number(perPage);
        const limit = Number(perPage);

        ShowPost.findAll({
            offset: offset,
            limit: limit,
            include: [{
                model: User,
                where: {
                    id: userId
                }
            }]
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'some error occurred while retreving show rooms main'
            })
        })
    }
}

    