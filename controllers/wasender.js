// const { BaileysClass } = require('@bot-wa/bot-wa-baileys')

const {sock} = require('./bot')

// sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
// sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
// sock.on('ready', async () => console.log('READY BOT'))

exports.sendMsg = async(req, res) => {
    const to = req.body.number
    const message = req.body.message
    console.log('Sending message to:' + to)
    const result = await sock.sendText(to+'@s.whatsapp.net', message)
    res.json(result)
}