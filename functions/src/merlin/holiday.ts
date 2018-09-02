import { Message } from 'node-telegram-bot-api'
import { day, humanizeTimestamp } from '../date-helper'
import HolidaysData from './holiday-data'

const config = {
  parse_mode: 'Markdown'
}
const getHoliday = () => {
  const timestamp = new Date().getTime()
  const date = new Date(timestamp).setHours(0, 0, 0, 0)
  return HolidaysData.find(value => {
    const holidayDate = new Date(value.date).setHours(0, 0, 0, 0)
    return holidayDate === date
  })
}

const getCurrentMonth = (today: Date) => {
  return today.getMonth() + 1
}

const getHolidaysMonth = (currentMonth: number) => {
  return HolidaysData.filter(data => {
    return new Date(data.date).getMonth() + 1 === currentMonth
  })
    .sort((x, y) => new Date(x.date).getDate() - new Date(y.date).getDate())
}

const copyWriteCurrentMonth = (holidays) => {
  return holidays.map(h => {
    const holidate = new Date(h.date)
    return `*${humanizeTimestamp(holidate, '%day%, %dd%-%month%-%yyyy%')}*\n${h.name}\n`
  }).join('\n')
}

module.exports = function (bot) {
  bot.onText(/\/hari_libur/, async (msg: Message) => {
    const chatId = msg.chat.id
    const todayDate = new Date()
    const holidayObj = getHolidaysMonth(getCurrentMonth(todayDate))
    const copyWrites = copyWriteCurrentMonth(holidayObj)

    await bot.sendMessage(chatId, `Hallo sayangku`)
    await bot.sendMessage(chatId, copyWrites, config)
  })
}