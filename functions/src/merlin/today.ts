import { Message } from 'node-telegram-bot-api'
import { readUserData } from '../db/user'
import { getTodayEvent } from '../interface'
import { convertListEvents } from '../utils'

const TYPES = ['group', 'supergroup']

module.exports = function (bot) {
  bot.onText(/\/today/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const teamupURL = await readUserData(chatId)
    const { data, error } = await getTodayEvent(teamupURL[1])

    if (TYPES.indexOf(type) >= 0 && !error)  {
      const { events } = data
      const listEvents = convertListEvents(events)
      bot.sendMessage(chatId, listEvents)
    } else if (error) {
      bot.sendMessage(chatId, 'Atur ulang id teamupnya dong. /atur')
    }
  })
}