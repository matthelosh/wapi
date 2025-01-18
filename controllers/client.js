const db = require('../models');
const Client = db.clients
const { Op } = require('sequelize');

exports.create = async (q, a) => {
    console.log(q, a)
    const reply = {
        question: q, answer: a
    }

    Client.create(reply)
        .then((data) => {
            console.log(data)
            return "Balasan disimpan";
        })
        .catch(err => {
            return err
        })

}

exports.find = async (msg) => {
    const rep = await Reply.findOne({
            where: {
                question: msg
            }
        })
        .then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })
    return rep
}