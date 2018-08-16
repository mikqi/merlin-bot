import { Message } from 'node-telegram-bot-api'
import { humanizeTodayDate } from '../utils'
import { day } from '../date-helper'
import { PPLS } from '../ppl-utils'

module.exports = function (bot) {

  bot.onText(/\/piket_hari_ini/, async (msg: Message) => {
    const chatId = msg.chat.id
    const DATES = new Date()
    const DATE = DATES.getDate()
    const DAY = DATES.getDay() - 1
    const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'

    const GROUP_PPL = PPLS[DAY][PPL_VERSION].join('\n')
    await bot.sendMessage(chatId, 'Oi oiii. Jangan lupa yang piket beli snack buat hari ini ya om tante. Ini demi kebersamaan umat ya sayy...😘🤤')
    await bot.sendMessage(chatId, `
# ${humanizeTodayDate()}

${GROUP_PPL}
    `)
  })

  bot.onText(/\/jadwal_piket/, async (msg: Message) => {
    const chatId = msg.chat.id

    const GROUP_PPL = PPLS.map(p => p['1'].join('\n') + '\n' + p['2'].join('\n'))
    const MESSAGE = GROUP_PPL.map((PPL, i) => {
      return `
# ${day[i + 1]}
${PPL}
      `
    }).join('')
    bot.sendMessage(chatId, 'Ini jadwal lengkap piketnya ya say. 😍')
    bot.sendMessage(chatId, MESSAGE)
  })
}