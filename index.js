const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN is missing!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const keyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '🛒 للشحن', callback_data: 'shipping' },
        { text: '💬 للاستفسار', callback_data: 'inquiry' }
      ],
      [
        {
          text: '📩 التواصل مع الإدارة',
          url: 'https://t.me/Yo55sff'
        }
      ]
    ]
  }
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'أهلاً وسهلاً بك في بوت ABN BRKAT ICHANSE 🌟\n\nاختر الخدمة التي تريدها من الأزرار بالأسفل:',
    keyboard
  );
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;

  let message = '';

  if (query.data === 'shipping') {
    message = 'للطلبات والشحن، اضغط زر التواصل مع الإدارة 👇';
  } else if (query.data === 'inquiry') {
    message = 'للاستفسار والمساعدة، تواصل معنا عبر الزر بالأسفل 👇';
  }

  await bot.answerCallbackQuery(query.id);

  if (message) {
    bot.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: [[
          {
            text: '📩 تواصل مع @Yo55sff',
            url: 'https://t.me/Yo55sff'
          }
        ]]
      }
    });
  }
});

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ABN BRKAT BOT is running');
}).listen(process.env.PORT || 3000, '0.0.0.0');

console.log('Bot started successfully');
