const Sequelize = require('sequelize');

module.exports = class RoomCart extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
           
        },
        {
            sequelize,
            underscored: true,
            modelName: 'RoomCart',
            tableName: 'room_carts',
            charset: 'utf8',
            timestamps: true
        });
    };
    static associate(db) {
       // room_cart: room_cart_item -> 1 : N
       // room_cart: user -> 1 : 1
       db.RoomCart.hasMany(db.RoomCartItem, { foreignKey: 'room_carts_id', sourceKey: 'id'});
       db.RoomCart.belongsTo(db.User, { foreignKey: 'users_id', targetKey: 'id'});
    }
};