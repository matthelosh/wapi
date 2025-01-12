const express = require('express')
const { BaileysClass } = require('@bot-wa/bot-wa-baileys')
const cors = require('cors')
const port = 3000
const app = express()
const bookRoute = require('./routes/book')
const waRoute = require('./routes/wa')
const { sock, handleMsg } = require('./controllers/bot')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(sock)
const db = require('./models')
db.sequelize.sync();
app.use('/api/books', bookRoute)
app.use('/api/wa', waRoute)


// const sock = new BaileysClass({})

// sock.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
// sock.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
// sock.on('ready', async () => console.log('READY BOT'))

// let awaitingResponse = false;

sock.on('message', async (message) => {
    const msg = message.body.toLowerCase().trim()
    handleMsg(msg, message.from)
})

// sock.on('message', async (message) => {
//     if (!awaitingResponse) {
//         await sock.sendPoll(message.from, 'Select an option', {
//             options: ['text', 'media', 'file', 'sticker'],
//             multiselect: false
//         });
//         awaitingResponse = true;
//     } else {
//         const command = message.body.toLowerCase().trim();
//         switch (command) {
//             case 'text':
//                 await sock.sendText(message.from, 'Hello world');
//                 break;
//             case 'media':
//                 await sock.sendMedia(message.from, 'https://www.w3schools.com/w3css/img_lights.jpg', 'Hello world');
//                 break;
//             case 'file':
//                 await sock.sendFile(message.from, 'https://github.com/pedrazadixon/sample-files/raw/main/sample_pdf.pdf');
//                 break;
//             case 'sticker':
//                 await sock.sendSticker(message.from, 'https://gifimgs.com/animations/anime/dragon-ball-z/Goku/goku_34.gif', { pack: 'User', author: 'Me' });
//                 break;
//             default:
//                 await sock.sendText(message.from, 'Sorry, I did not understand that command. Please select an option from the poll.');
//                 break;
//         }
//         awaitingResponse = false;
//     }
//     console.log(message.from)
//     sock.sendText(message.from, "Ada yang bisa saya bantu?")
// });

app.get('/send', async(req, res) => {
    let msg = await sock.sendText('6285175253784@s.whatsapp.net', 'Halo Mat')
    console.log(`Sending message to +6285175253784`)
    res.send(msg)
})

app.listen(port, ()=> console.log('Listening on ' + port))