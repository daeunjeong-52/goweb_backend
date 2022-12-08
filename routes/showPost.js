module.exports = app => {

    const showPosts = require('../controllers/showPostController.js');
    var router = require('express').Router();

    router.get('/rooms/all', showPosts.findRoomAll);

    router.get('/rooms', showPosts.findRoomPaging);
    router.get('/foods', showPosts.findFoodPaging);

    router.get('/rooms/main', showPosts.findRoomTop4);
    router.get('/foods/main', showPosts.findFoodTop4);

    router.get('/rooms/:id', showPosts.findRoomWithItem); // room post 상세
    router.get('/foods/:id', showPosts.findFoodWithItem); // food post 상세

    router.get('/my-posts', showPosts.findMyPosts);

    app.use('/api/show', router);
}