module.exports = app => {

    // 내 정보 - 로그인 한 사용자만 볼 수 있어야 함

    const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
    const carts = require('../controllers/cartController.js');
    var router = require('express').Router();

    app.use('/api/', router);
}