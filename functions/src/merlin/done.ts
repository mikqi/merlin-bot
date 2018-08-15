import { Message } from 'node-telegram-bot-api'

module.exports = function (bot) {
  bot.onText(/\/udah_beli/, async (msg: Message) => {
    const TYPES = ['group', 'supergroup']
    const chatId = msg.chat.id
    const type = msg.chat.type

    if (TYPES.indexOf(type) >= 0) {
      await bot.sendMessage(chatId, `Yeiyyyy si @${msg.from.username} sudah beli snack lohhhh.. Makasih yaaa sayanggg 😘. Jangan lupa dihabiskan ya teman-teman..`)
    } else {
      await bot.sendMessage(chatId, 'Ngapain sih om? Ampas lu om. Udah beli apa coba?')
    }

  })

}