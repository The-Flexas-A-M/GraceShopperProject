const Sequelize = require('sequelize')

const db = require('../db')

const OrderItem = db.define('orderitem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
        },
    },
});


module.exports = OrderItem;