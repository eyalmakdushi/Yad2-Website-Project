/**
 * This file establishes the Sequelize connection and defines the database models. It's imperative not to directly modify
 * this file. Instead, copy it into your models directory and load it wherever you require access to the model classes
 * using the following line of code:
 * const db = require('../models');
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const { DataTypes } = require('sequelize');

/**
 * Definition of the User model.
 * @param {object} sequelize - The Sequelize instance.
 * @returns {object} - The User model.
 */
module.exports = sequelize => {
    return sequelize.define('User', {
        // Define your User model fields here
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Define models and load them into db object
db.User = require('./index')(sequelize);
db.Ad = require('./Ad')(sequelize);
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

// Establish associations between models if needed
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
