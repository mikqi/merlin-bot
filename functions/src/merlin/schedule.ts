import { readUserData } from '../db/user'
const TYPES = ['supergroup', 'group']

module.exports = function (bot) {
  bot.onText(/\/cek/, async (msg) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    
    if (TYPES.indexOf(type) !== -1) {
      const teamupId = await readUserData(chatId)
      // TODO: Sambungin punya kokoh
      await bot.sendMessage(chatId, 'ini teamup idnya, bisa langsung diparse gan' + teamupId)
    } else {
      await bot.sendMessage(chatId, 'Maaf merlin hanya dapat disetting melalui group.')
    }
  })

  
}