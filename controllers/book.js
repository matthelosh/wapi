const db = require('../models');
const Book = db.books;


exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'Title cannot be empty'
        });
    }
    const book = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    
    Book.create(book)
        .then((data) => {
            res.json({
                message: 'Buku disimpan',
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Some error occured",
                data: null
            })
        })
}

exports.get = (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => {
            res.json({
                message: "Bukunya ketemu",
                data: book
            })
        })

}
