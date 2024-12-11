const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ImageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Thiết lập quan hệ với Category
Product.belongsTo(Category, { foreignKey: 'CategoryID' });

module.exports = Product;
