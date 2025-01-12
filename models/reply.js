const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define('replies', {
        question: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        },
    });

    return Reply;
}