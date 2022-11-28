const db = require('../models');
const Comment = db.Comment;
const Op = db.sequelize.Op;

// Comment 전체 조회
exports.findAll = (req, res) => {

    const postId = req.query.postId;

    Comment.findAll()
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
exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const postId = req.query.postId;

    // create comment
    const comment = {
        content: req.body.content
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