const { BaileysClass } = require('@bot-wa/bot-wa-baileys')

const sock = new BaileysClass({})

sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
sock.on('ready', async () => console.log('READY BOT'))

const handleMsg = async(msg, from) => {
    switch(msg) {
        case "tes":
            await sock.sendText(from, "Jangan suka ngetes");
            break;
        default:
            await sock.sendText(from, "Mau tanya apa neh?");
            break;
    }
}


module.exports = {sock, handleMsg}