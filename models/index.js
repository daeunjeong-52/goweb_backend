const Sequelize  = require('sequelize');
const ShowPost = require('./showPost');
const RoomItem = require('./roomItem');
const FoodItem = require('./foodItem');
const Comment = require('./comment');
const User = require('./user');
const CartItem = require('./cartItem');
const Cart = require('./cart');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// db에 model 추가
db.ShowPost = ShowPost;
db.RoomItem = RoomItem;
db.FoodItem = FoodItem;
db.Comment = Comment;
db.User = User;
db.Cart = Cart;
db.CartItem = CartItem;

ShowPost.init(sequelize);
RoomItem.init(sequelize);
FoodItem.init(sequelize);
Comment.init(sequelize);
User.init(sequelize);
Cart.init(sequelize);
CartItem.init(sequelize);

ShowPost.associate(db);
RoomItem.associate(db);
FoodItem.associate(db);
Comment.associate(db);
User.associate(db);
Cart.associate(db);
CartItem.associate(db);

Object.keys(db).forEach((modelName) => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;