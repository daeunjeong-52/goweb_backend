const db = require('../models');
const RoomItem = require('../models/roomItem');
const jwt = require('jsonwebtoken');
const ShowPost = db.ShowPost;
const User = db.User;
const Op = db.sequelize.Op;

exports.addRoomPost = async (req, res) => {
    
    // room post create
    const roomPost = {
        title: req.body.title,
        description: req.body.description,
        category: 'room',
        users_id: req.body.userId
    };
    console.log(roomPost);
    const saveRoomPost = await ShowPost.create(roomPost);

    // room items create
    const roomPostItems = [];
    const roomItem1 = await RoomItem.create({
        productName: req.body.productName1,
        brandName: req.body.brandName1,
    });
    const roomItem2 = await RoomItem.create({
        productName: req.body.productName2,
        brandName: req.body.brandName2,
    });
    const roomItem3 = await RoomItem.create({
        productName: req.body.productName3,
        brandName: req.body.brandName3,
    });
    const roomItem4 = await RoomItem.create({
        productName: req.body.productName4,
        brandName: req.body.brandName4,
    });

    await saveRoomPost.addRoomItem([roomItem1, roomItem2, roomItem3, roomItem4]);

    res.sendStatus(200);
};

exports.findMyRooms = (req, res) => {

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
            }],
            where: {
                category: 'room'
            }
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

exports.findMyRoomPost = (req, res) => {
    
    if(req.cookies && req.cookies.token) {

        const decoded = jwt.verify(req.cookies.token, "abc1234567");
        const userId = decoded.id;

        const postId = req.query.postId;

        console.log(postId);
    
        ShowPost.findAll({
            include: [{
                model: RoomItem,
                where: {
                    show_posts_id: postId
                }
            }],
            where: {
                id: postId,
                category: 'room',
                users_id: userId
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
}

exports.removeRoomPost = async (req, res) => {

    if(req.cookies && req.cookies.token) {

        const decoded = jwt.verify(req.cookies.token, "abc1234567");
        const userId = decoded.id;

        const postId = req.query.postId;

        console.log(postId);

        await RoomItem.destroy({
            where: {
                show_posts_id: postId
            }
        });
    
        ShowPost.destroy({
            where: {
                id: postId,
                users_id: userId
            }
        })
        .then(data => {
            res.status(200).send({
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while destroying room cart item."
              });
        })
    }
}

exports.editRoomPost = async (req, res) => {
    if(req.cookies && req.cookies.token) {

        const decoded = jwt.verify(req.cookies.token, "abc1234567");
        const userId = decoded.id;

        const postId = req.body.postId;

        const findPost = await ShowPost.findOne({
            where: {
                id: postId
            }
        });

        const findRoomItems = await RoomItem.findAll({
            where: {
                show_posts_id: postId
            }
        });

        const productName1 = (req.body.productName1 == '') ? findRoomItems[0].dataValues.productName : req.body.productName1;
        const brandName1 = (req.body.brandName1 == '') ? findRoomItems[0].dataValues.brandName : req.body.brandName1;
        const productName2 = (req.body.productName2 == '') ? findRoomItems[1].dataValues.productName : req.body.productName2;
        const brandName2 = (req.body.brandName2 == '') ? findRoomItems[1].dataValues.brandName : req.body.brandName2;
        const productName3 = (req.body.productName3 == '') ? findRoomItems[2].dataValues.productName : req.body.productName3;
        const brandName3 = (req.body.brandName3 == '') ? findRoomItems[2].dataValues.brandName : req.body.brandName3;
        const productName4 = (req.body.productName4 == '') ? findRoomItems[3].dataValues.productName : req.body.productName4;
        const brandName4 = (req.body.brandName4 == '') ? findRoomItems[3].dataValues.brandName : req.body.brandName4;

        await RoomItem.update({
            productName: productName1,
            brandName: brandName1
        }, {
            where: {
                show_posts_id: postId,
                id: findRoomItems[0].dataValues.id
            }
        });

        await RoomItem.update({
            productName: productName2,
            brandName: brandName2
        }, {
            where: {
                show_posts_id: postId,
                id: findRoomItems[1].dataValues.id
            }
        });

        await RoomItem.update({
            productName: productName3,
            brandName: brandName3
        }, {
            where: {
                show_posts_id: postId,
                id: findRoomItems[2].dataValues.id
            }
        });

        await RoomItem.update({
            productName: productName4,
            brandName: brandName4
        }, {
            where: {
                show_posts_id: postId,
                id: findRoomItems[3].dataValues.id
            }
        });


        const title = (req.body.title == '') ? findPost.dataValues.title : req.body.title;
        const description = (req.body.description == '') ? findPost.dataValues.description : req.body.description;

        const postArg = {
            title: title,
            description: description
        };

        ShowPost.update(postArg, {
            where: {
                users_id: userId
            }
        })
        .then(data => {
            res.status(200).send({
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while destroying room cart item."
              });
        })
    }
}