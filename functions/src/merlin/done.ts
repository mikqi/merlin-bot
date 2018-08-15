import { Message } from 'node-telegram-bot-api'

module.exports = function (bot) {
  bot.onText(/\/udah_beli/, async (msg: Message) => {
    const TYPES = ['group', 'supergroup']
    const chatId = msg.chat.id
    const type = msg.chat.type

    if (TYPES.indexOf(type) >= 0) {
      await bot.sendMessage(chatId, `Yeiyyyy si @${msg.from.username} sudah beli snack lohhhh.. Makasih loh yaa @${msg.from.username} sayanggg 😘. Jangan lupa dihabiskan ya. Yang udah gemuk gak usah makan snack biar yang belum gemuk aja yang makan. 🙊`)
    } else {
      await bot.sendMessage(chatId, 'Ngapain sih om? Ampas lu om. Udah beli apa coba?')
    }

  })

}