const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
    CartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Cart.belongsTo(User, { foreignKey: 'UserID' });
Cart.belongsTo(Product, { foreignKey: 'ProductID' });

module.exports = Cart;
