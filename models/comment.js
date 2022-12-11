const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        },
        {
            sequelize,
            underscored: true,
            modelName: 'Comment',
            tableName: 'comments',
            charset: 'utf8',
            timestamps: true
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.ShowPost, { foreignKey: 'show_posts_id', targetKey: 'id'});
        db.Comment.belongsTo(db.User, { foreignKey: 'users_id', targetKey: 'id'});
    }
};