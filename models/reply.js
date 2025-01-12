const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define('replies', {
        question: {
            type: Sequelize.type.TEXT
        },
        answer: {
            type: Sequelize.type.TEXT
        },
    });

    return Reply;
}