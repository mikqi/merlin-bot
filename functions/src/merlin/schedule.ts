import { Message } from 'node-telegram-bot-api'
import { readUserData } from '../db/user'
import { getTodayEvent } from '../interface'
import { convertListEvents } from '../utils'

const TYPES = ['group', 'supergroup']

module.exports = function (bot) {
  bot.onText(/\/cek/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const teamupURL = await readUserData(chatId)
    const { data, error } = await getTodayEvent(teamupURL[1])
    console.log({chatId, type})

    if (TYPES.indexOf(type) >= 0 && !error)  {
      const { events } = data
      const listEvents = convertListEvents(events)
      await bot.sendMessage(chatId, listEvents)
      await bot.sendMessage(chatId, `versi lengkapnya bisa ceki ceki [dimari](${teamupURL[1]}) sis`, {
        parse_mode: 'Markdown'
      })
    } else if (error) {
      bot.sendMessage(chatId, 'Atur ulang id teamupnya dong. /atur', {
        parse_mode: 'Markdown'
      })
    }
  })
}
