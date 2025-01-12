const db = require('../models');
const Reply = db.replies

exports.create = (q, a) => {
    const reply = {
        question: q, answer: a
    }

    Reply.create(reply)
        .then((data) => {
            return "Balasan disimpan";
        })
        .catch(err => {
            return err
        })

}