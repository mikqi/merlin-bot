module.exports = function (bot) {
  bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, 'Hai kak.')
    await bot.sendMessage(chatId, 'Yang bisa Merlin lakuin cuma ini kak.')
    await bot.sendMessage(chatId, `
/cek itu nanti Merlin bakal liat siapa aja yang remote.
/atur itu nanti Merlin bakal ngatur link teamup kaka
    `)
  })
}