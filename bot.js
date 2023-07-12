const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const botToken = "6351853412:AAHNxd6ihqqaQoguKQKYVLENRLDeMMK-s5Q";
const openaiToken = "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";

const config = new Configuration({
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome To Abir Maji AI ChatBot");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const reply = await openai.createCompletion({
    max_tokens: 100,
    model: "babbage",
    prompt: msg.text,
    temperature: 0.5,
  });

  bot.sendMessage(chatId, reply.data.choices[0].text);
});
