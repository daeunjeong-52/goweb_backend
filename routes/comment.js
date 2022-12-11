module.exports = app => {

    const comments = require('../controllers/commentController.js');
    var router = require('express').Router();

    router.get("/comments", comments.findComments);
    router.post("/comments", comments.addComment);
   
    app.use('/api', router);
}