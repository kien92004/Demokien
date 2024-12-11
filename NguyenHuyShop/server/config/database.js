const { Sequelize } = require('sequelize');

// Thiết lập kết nối với SQL Server
const sequelize = new Sequelize('NguyenHuyShop', 'sa', 'Password123', {
    host: '169.254.240.48',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Sử dụng mã hóa
            enableArithAbort: true
        }
    }
});

module.exports = sequelize;
