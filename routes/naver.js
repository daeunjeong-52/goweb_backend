// naver 라우터
const client_id = 'g9FaGMLLQivRJT82mTtX';
const client_secret = 'KfMNqT8aL3';

module.exports = app => {

    const naverShop = require('../controllers/naverShopController.js');

    var router = require('express').Router();

    router.get('/items', naverShop.searchItem);

    app.use('/api/search', router);
}