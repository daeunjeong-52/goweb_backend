const Sequelize = require('sequelize');

module.exports = class FoodItem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ingredientName: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            purchasePlace: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
        },
        {
            sequelize,
            underscored: true,
            modelName: 'FoodItem',
            tableName: 'food_items',
            charset: 'utf8',
            timestamps: true
        });
    }
    static associate(db) {
        db.FoodItem.belongsTo(db.ShowPost, { foreignKey: 'show_posts_id', targetKey: 'id'});
    }
};