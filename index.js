const { Client, LocalAuth } = require('whatsapp-web.js'); const 
qrcode = require('qrcode-terminal'); 
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ],
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium'
  }
});
client.on('qr', qr => { qrcode.generate(qr, { small: true });
});
client.on('ready', () => { console.log('Client is ready!');
});
client.on('message', message => { if (message.body === '!ping') { 
        message.reply('pong');
    }
});
client.initialize();
