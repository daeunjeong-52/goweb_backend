const db = require('../models');
const Comment = db.Comment;
const ShowPost = db.ShowPost;
const Op = db.sequelize.Op;

// Comment 전체 조회
exports.findComments = (req, res) => {

    const postId = req.params.id;
    console.log(postId);

    Comment.findAll({
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

    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const postId = req.query.postId;

    // create comment
    const comment = {
        show_posts_id: postId,
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