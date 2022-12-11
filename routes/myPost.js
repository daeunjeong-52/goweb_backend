module.exports = app => {

    const myPosts = require('../controllers/myPostController.js');
    var router = require('express').Router();

    router.post('/rooms', myPosts.addRoomPost);

    router.get('/rooms/all', myPosts.findMyRooms);
    router.get('/rooms', myPosts.findMyRoomPost);

    router.delete('/rooms', myPosts.removeRoomPost);
    router.put('/rooms', myPosts.editRoomPost);

    app.use('/api/my-posts', router);
}