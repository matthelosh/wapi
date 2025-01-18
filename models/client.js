const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('clients', {
        number: {
            type: Sequelize.TEXT,
            unique: true
        },
        name: {
            type: Sequelize.TEXT
        },
        group: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.TEXT
        },
    });

    return Client;
}