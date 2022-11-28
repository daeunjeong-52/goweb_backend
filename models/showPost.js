const Sequelize = require('sequelize');

module.exports = class ShowPost extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(150),
                allowNull: true
            },
            imgPath: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            category: {
                type: Sequelize.ENUM('room', 'food', 'etc'),
                allowNull: false
            },
            like: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            underscored: true,
            modelName: 'ShowPost',
            tableName: 'show_posts',
            charset: 'utf8',
            timestamps: true
        });
    }
    static associate(db) {
        db.ShowPost.hasMany(db.RoomItem, {foreignKey: 'show_posts_id', sourceKey: 'id'}),
        db.ShowPost.hasMany(db.FoodItem, {foreignKey: 'show_posts_id', sourceKey: 'id'}),
        db.ShowPost.hasMany(db.Comment, { foreignKey: 'show_posts_id', sourceKey: 'id'})
    };
};