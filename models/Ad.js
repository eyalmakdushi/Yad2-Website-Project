const { DataTypes } = require('sequelize');
/**
 * Definition of the Ad model.
 * @param {object} sequelize - The Sequelize instance.
 * @returns {object} - The Ad model.
 */
module.exports = sequelize => {
    return sequelize.define('Ad', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20] // 20 chars title
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200] // 200 characters desc
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0 // price >= 0
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\d{2,3}-\d{7}$/ // valid format
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true // valid format
            }
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
};