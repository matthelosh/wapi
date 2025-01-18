const { BaileysClass } = require('@bot-wa/bot-wa-baileys')
const reply = require('./reply');
const client = require('./client')
const sock = new BaileysClass({})
const { canSaveReply } = require('../middleware/isAuth')

sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
sock.on('ready', async () => console.log('READY BOT'))

const handleMsg = async(msg, from) => {
    let hasReply = await reply.find(msg)
    try {
        
        if (hasReply) {
            await sock.sendText(from, hasReply.answer)
        } else {
            const splits = msg.split("#")
            const isAllowed = await canSaveReply(from)
            if (isAllowed) {
    
                switch(splits[0]) {
                    case "simpan":
                        const result = await reply.create(splits[1], splits[2])
                        
                        await sock.sendText(from, "Jawaban disimpan")
                        break;
                    case "register":
                        const clientResult = await client.create(from, splits)
                        await sock.sendText(from, clientResult.message)
                        break;
                    default:
                        // await sock.sendText(from, "Saya belum mengerti maksud Anda!");
                        break;
                }
            } else {
                await sock.sendText(from, "Maaf! Anda tidak boleh melakukan hal ini!")
            }
        }
    } catch (error) {
        console.error("Error in handleMsg", error)
        await sock.sendText(from, "Maaf ada kesalahan sistem")
    }
}


module.exports = {sock, handleMsg}