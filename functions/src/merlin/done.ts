import { Message } from 'node-telegram-bot-api'
import { PPLS } from '../ppl-utils'

module.exports = function (bot) {
  bot.onText(/\/udah_beli/, async (msg: Message) => {
    const TYPES = ['group', 'supergroup']
    const chatId = msg.chat.id
    const type = msg.chat.type
    const from = msg.from
    const DATES = new Date()
    const DATE = DATES.getDate()
    const DAY = DATES.getDay() - 1
    const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'

    const GROUP_PPL = PPLS[DAY][PPL_VERSION].join('\n')

    console.log({
      type: 'DONE',
      from,
    })

    if (TYPES.indexOf(type) >= 0 && GROUP_PPL.includes(`@${msg.from.username}`)) {
      return await bot.sendMessage(chatId, `Yeiyyyy si @${msg.from.username} sudah beli snack lohhhh.. Makasih yaaa sayanggg 😘. Jangan lupa dihabiskan ya teman-teman..`)
    } else if (TYPES.indexOf(type) >= 0) {
      return 0
    } else {
      return await bot.sendMessage(chatId, 'Ngapain sih om? Ampas lu om. Udah beli apa coba?')
    }

  })

}