const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            loginId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            loginPw: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
        },
        {
            sequelize,
            underscored: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            timestamps: true
        });
    }
    static associate(db) {
        db.User.hasMany(db.ShowPost, { foreignKey: "users_id", sourceKey: "id"});
        db.User.hasOne(db.Cart, { foreignKey: "users_id", sourceKey: 'id'});
    }
};