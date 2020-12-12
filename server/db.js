/*
    Поддержка базы данных SQLite
*/
const { Sequelize, Model } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.connection);

// Загружаемые файлы
class File extends Model {}

File.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    field: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.BLOB
    }
}, {
    sequelize,
    indexes: [{
        fields: ['field']
    }]
});


module.exports = {
    sequelize,
    File
};
