const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('clients', {
        number: {
            type: Sequelize.TEXT
        },
        name: {
            type: Sequelize.TEXT
        },
        token: {
            type: Sequelize.TEXT
        },
    });

    return Reply;
}