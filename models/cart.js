const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            
        },
        {
            sequelize,
            underscored: true,
            modelName: 'Cart',
            tableName: 'carts',
            charset: 'utf8',
            timestamps: true
        });
    };
    static associate(db) {
       // room_cart: room_cart_item -> 1 : N
       // room_cart: user -> 1 : 1
       db.Cart.hasMany(db.CartItem, { foreignKey: 'carts_id', sourceKey: 'id'});
       db.Cart.belongsTo(db.User, { foreignKey: 'users_id', targetKey: 'id'});
    }
};