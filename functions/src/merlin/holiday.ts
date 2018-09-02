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

const getHolidaysMonth = (currentMonth: number, currentYear: number, type = 'normal') => {
  return HolidaysData.filter(data => {
    const date = new Date(data.date)
    const compareMonth = type === 'normal' ? date.getMonth() + 1 === currentMonth : date.getMonth() + 1 <= (currentMonth + 2) && date.getMonth() + 1 >= currentMonth
    return compareMonth && date.getFullYear() === currentYear
  })
    .sort((x, y) => new Date(x.date).getDate() - new Date(y.date).getDate())
}

const copyWriteCurrentMonth = (holidays, type = 'normal') => {
  let currentMonth = 0
  return holidays.map(h => {
    const holidate = new Date(h.date)
    let monthName = ''
    if (currentMonth !== holidate.getMonth()) {
      currentMonth = holidate.getMonth()
      const separator = type !== 'normal' ? '-----------------------------\n' : ''
      monthName = separator + humanizeTimestamp(holidate, '%month%') + '\n'
    } else {
      monthName = ''
    }
    return `*${monthName}${humanizeTimestamp(holidate, '%day%, %dd%-%month%-%yyyy%')}*\n${h.name}\n`
  }).join('\n')
}

module.exports = function (bot) {
  bot.onText(/\/hari_libur_bulan_ini/, async (msg: Message) => {
    const chatId = msg.chat.id
    const todayDate = new Date()
    const holidayObj = getHolidaysMonth(getCurrentMonth(todayDate), todayDate.getFullYear())
    const copyWrites = copyWriteCurrentMonth(holidayObj)

    await bot.sendMessage(chatId, `Ini hasil penerawangan menurut aku ya say. 🙈\n\n${copyWrites}`, config)
  })

  bot.onText(/\/hari_libur_3_bulan_kedepan/, async (msg: Message) => {
    const chatId = msg.chat.id
    const todayDate = new Date()
    const holidayObj = getHolidaysMonth(getCurrentMonth(todayDate), todayDate.getFullYear(), '3months')
    const copyWrites = copyWriteCurrentMonth(holidayObj, '3month')

    await bot.sendMessage(chatId, `Ini hasil penerawangan untuk 3 bulan kedepan menurut aku ya say. 🙈\n\n${copyWrites}`, config)
  })
}