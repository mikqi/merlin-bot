const TYPES = ['supergroup', 'group']

module.exports = function (bot) {
  bot.onText(/\/atur/, async (msg) => {
    const chatId = msg.chat.id
    const test = msg.chat.type
    
    if (TYPES.indexOf(msg.chat.type) !== -1) {
      await bot.sendMessage(chatId, 'Ini settings')
    } else {
      await bot.sendMessage(chatId, 'Maaf merlin hanya dapat disetting melalui group.')
    }
  })
}