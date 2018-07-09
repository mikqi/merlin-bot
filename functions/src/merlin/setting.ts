import { writeUserData } from '../db/user'
const TYPES = ['supergroup', 'group']

module.exports = function (bot) {
  bot.onText(/\/atur/, async (msg, match) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const idTeamup = match.input.replace(match[0], '').trim()
    console.log(idTeamup)
    
    if (TYPES.indexOf(type) !== -1) {
      if (idTeamup) {
        try {
          await writeUserData(chatId, idTeamup, `https://teamup.com/${idTeamup}`)
          await bot.sendMessage(chatId, 'ID teamup kalian sudah di set')
        } catch (error) {
          await bot.sendMessage(chatId, 'Gagal Set ID Teamup')
        }
      } else {
        await bot.sendMessage(chatId, 'Cara atur id teamup salah.')
        await bot.sendMessage(chatId, 'harus seperti ini. /atur {id}')
      }
      // const opts = {
      //     reply_markup: JSON.stringify({ force_reply: true }
      // )};
      // await bot.sendMessage(chatId, 'Masukkan id teamup kalian :) ', opts)
      // .then(function(sended) {
      //     const messageId = sended.message_id;
      //     bot.onReplyToMessage(chatId, messageId, async function onSettings(data) {
      //       writeUserData(chatId, data.text, `https://teamup.com/${data.text}`)
      //       await bot.sendMessage(chatId, 'Id teamup kalian sudah masuk ')
      //     })
      // })
    } else {
      await bot.sendMessage(chatId, 'Maaf merlin hanya dapat disetting melalui group.')
    }
  })

  
}