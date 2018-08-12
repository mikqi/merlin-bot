import { Message } from 'node-telegram-bot-api'

module.exports = function (bot) {
  bot.onText(/\/help/, async (msg: Message) => {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, 'Hallo sayangku.')
    await bot.sendMessage(chatId, 'Yang bisa Merlin lakuin cuma ini say.')
    await bot.sendMessage(chatId, `
/cek itu nanti Merlin akan ramal siapa aja yang gak di kantor.
/buat_leave itu kalian bisa set leave tanpa harus buat Team Up lohh. Japri aku aja ya say.
    `)
  })
}