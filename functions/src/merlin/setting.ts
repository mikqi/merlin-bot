import { writeUserData } from '../db/user'
const TYPES = ['supergroup', 'group']

module.exports = function (bot) {
  bot.onText(/\/atur/, async (msg) => {
    const chatId = msg.chat.id
    const test = msg.chat.type
    
    if (TYPES.indexOf(msg.chat.type) !== -1) {
      const opts = {
          reply_markup: JSON.stringify({ force_reply: true }
      )};
      await bot.sendMessage(chatId, 'Masukkan id teamup kalian :) ', opts)
      .then(function(sended) {
          const messageId = sended.message_id;
          bot.onReplyToMessage(chatId, messageId, async function onSettings(data) {
            await writeUserData(chatId, data.text, `https://teamup.com/${data.text}`)
            await bot.sendMessage(chatId, 'Id teamup kalian sudah masuk ')
          })
      })
    } else {
      await bot.sendMessage(chatId, 'Maaf merlin hanya dapat disetting melalui group.')
    }
  })

  
}