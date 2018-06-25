import { Message } from 'node-telegram-bot-api'
import { getTodayEvent } from '../interface'
import { convertListEvents } from '../utils'

const TYPES = ['group', 'supergroup']

module.exports = function (bot) {
  bot.onText(/\/today/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const { data } = await getTodayEvent()
    const { events } = data
    console.log(events)

    if (TYPES.indexOf(type) >= 0) {
      const listEvents = convertListEvents(events)
      bot.sendMessage(chatId, listEvents)
    }
  })
}