const db = require('../models');
const Client = db.clients
const { Op } = require('sequelize');

const generateToken = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ''
    const len = chars.length;
    for (let i=0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * len))
    }

    return result
}

exports.create = async (from, splits) => {
    // console.log(from, splits)
    try {
        const nums = from.split('@')
        let res = {}
        const existed = await Client.findOne({
            where: {
                number: splits[1]
            }
        })
        // console.log(existed)
        
        if (existed) {
            const token = generateToken(8)
            existed.update({name: splits[2], group: splits[3], token: token})
            return {message: "Data Anda diperbarui.\nToken baru: " +token, data: existed}
        } else {
            const token = generateToken(8)
            const client = {
                number: splits[1], name: splits[2], group: splits[3], token: token
            }
        
            const newClient = await Client.create(client)
            return {
                message: `Data Klien disimpan.\nToken: ${token}`
            }
        }
    } catch (error) {
        console.error("Error createing client", error)
        return {
            message: "Ada Kesalahan dalam pemrosesan",
            error: error.message
        }
    }
    
}
