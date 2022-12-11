const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const Op = db.sequelize.Op;

// Comment 전체 조회
exports.findComments = (req, res) => {

    const postId = req.query.postId;
    console.log(postId);

    Comment.findAll({
        include: [{
            model: User,
        }],
        where: {
            show_posts_id: parseInt(postId)
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'some error occurred while retrieving comments'
        });
    });
}

// Comment 추가
exports.addComment = (req, res) => {

    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    console.log(req.body.postId);
    console.log(req.body.content);
    console.log(req.body.userId);

    // create comment
    const comment = {
        show_posts_id: req.body.postId,
        content: req.body.content,
        users_id: req.body.userId
    };

    // save comment
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating comment."
            });
          });
} 