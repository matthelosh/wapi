const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        published: {
            type: Sequelize.BOOLEAN,
        }
    });

    return Book;
}