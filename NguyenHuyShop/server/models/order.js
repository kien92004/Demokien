const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('Order', {
    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    OrderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Order.belongsTo(User, { foreignKey: 'UserID' });
Order.belongsTo(Product, { foreignKey: 'ProductID' });

module.exports = Order;
