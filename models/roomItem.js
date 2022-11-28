const Sequelize = require('sequelize');

module.exports = class RoomItem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            productName: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            brandName: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            }
        },
        {
            sequelize,
            underscored: true,
            modelName: 'RoomItem',
            tableName: 'room_items',
            charset: 'utf8',
            timestamps: true
        });
    };
    static associate(db) {
        db.RoomItem.belongsTo(db.ShowPost, { foreignKey: 'show_posts_id', targetKey: 'id'});
    }
};