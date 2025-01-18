const { BaileysClass } = require('@bot-wa/bot-wa-baileys')
const reply = require('./reply');
const client = require('./client')
const sock = new BaileysClass({})

sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
sock.on('ready', async () => console.log('READY BOT'))

const handleMsg = async(msg, from) => {
    let hasReply = await reply.find(msg)
    if (hasReply) {
        await sock.sendText(from, hasReply.answer)
    } else {
        const splits = msg.split("#")
        switch(splits[0]) {
            case "simpan":
                const result = await reply.create(splits[1], splits[2])
                
                await sock.sendText(from, "Jawaban disimpan")
                break;
            case "register":
                const clientResult = await client.create(from, splits)
                await sock.sendText(from, from)
                break;
            default:
                // await sock.sendText(from, "Saya belum mengerti maksud Anda!");
                break;
        }
    }
}


module.exports = {sock, handleMsg}