const { BaileysClass } = require('@bot-wa/bot-wa-baileys')
const reply = require('./reply');
const sock = new BaileysClass({})

sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
sock.on('ready', async () => console.log('READY BOT'))

const handleMsg = async(msg, from) => {
    let hasReply = await reply.find(msg)
    // console.log(hasReply, 'tes')
    if (hasReply) {
        // console.log(hasReply)
        await sock.sendText(from, hasReply.answer)
    } else {
        const splits = msg.split("#")
        switch(splits[0]) {
            case "simpan":
                const result = await reply.create(splits[1], splits[2])
                
                await sock.sendText(from, "Masih proses")
                break;
            default:
                await sock.sendText(from, "Saya belum mengerti maksud Anda!");
                break;
        }
    }




    // // switch(msg) {
    // //     case "tes":
    // //         await sock.sendText(from, "Jangan suka ngetes");
    // //         break;
    // //     default:
    // //         await sock.sendText(from, "Mau tanya apa neh?");
    // //         break;
    // // }
    // // Cek jika pesan ada dalam daftar auto reply
    // reply.find(msg)
    // // console.log(cek)

    
}


module.exports = {sock, handleMsg}