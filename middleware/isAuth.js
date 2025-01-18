const db = require('../models');
const Client = db.clients
const { Op } = require('sequelize');

const getClient = async (clientId) => {
    const client = await Client.findOne({
        where: {
            number: clientId
        }
    })
    return client
}

// Route Middleware
const isAuth  = async(req, res, next) => {
    try {
        const client = await getClient(req.query.clientId)
        if (!client) {

            return res.status(401).json({message: 'Unauthorized'})
        } 
        const authHeader = req.headers['authorization']
        if (!authHeader) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            
            return res.status(401).json({message: 'Unauthorized'})
        }
        console.log(token, client.token)
        const isValid = client.token == token
        if (!isValid) {
            return res.status(403).json({message: 'Forbidden'})
        }
        req.client = client
        next()
    } catch(err) {
        return res.status(500).json({message: 'Internal server error', error: err.message})
    }
}


// Contorller Middleware
const canSaveReply = async(from) => {
    try {
        const client = await Client.findOne({
            where: {
                number: from.split('@')[0]
            }
        })
        if ((client && (client.group === 'admin') || (from.split('@')[0] === '6285175253784'))) {
            return true
        }
        return false
    } catch (error) {
        console.error('Error:', error)
        return false
    }
}

module.exports = {isAuth, canSaveReply}