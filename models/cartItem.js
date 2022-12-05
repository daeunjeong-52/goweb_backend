const Sequelize = require('sequelize');

module.exports = class CartItem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            image: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            brand: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            link: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            lprice: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            category1: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            category2: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            category3: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            category4: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            category: {
                type: Sequelize.ENUM('room', 'food'),
                allowNull: false
            }
        },
        {
            sequelize,
            underscored: true,
            modelName: 'CartItem',
            tableName: 'cart_items',
            charset: 'utf8',
            timestamps: true
        });
    };
    static associate(db) {
       // room_carts : room_carts_item -> 1: N
       db.CartItem.belongsTo(db.Cart, { foreignKey: 'carts_id', targetkey: 'id'});
    }
};