import { Message } from 'node-telegram-bot-api'
import { humanizeTodayDate } from '../utils'
import { day } from '../date-helper'

const PPLS = [
  {
    '1': ['@adityafgan', '@firliadyta', '@irfanalfarabbi', '@akbarstd'],
    '2': ['@rezafaizarahman', '@danielbintar', '@elelvyra']
  },
  {
    '1': ['@kevingoz', '@vgeraldo', '@fikryd14'],
    '2': ['@gazandi', '@hamnahs', '@Apreliamaisara']
  },
  {
    '1': ['@mrqorib', '@vandyroy', '@noviyaniw'],
    '2': ['@dhinazor', '@izzuddin012', '@tenosiswono']
  },
  {
    '1': ['@KevinYudistira', '@handrata', '@calvingzhartono'],
    '2': ['@charlesrandicha', '@brurce', '@msabiqd']
  },
  {
    '1': ['@mikqi', '@erjodi', '@oliviaputr'],
    '2': ['@arkadiusreymond', '@herwando', '@albab21']
  }
]

module.exports = function (bot) {
  const DATES = new Date()
  const DATE = DATES.getDate()
  const DAY = DATES.getDay() - 1
  const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'

  bot.onText(/\/snack_today/, async (msg: Message) => {
    const chatId = msg.chat.id

    const GROUP_PPL = PPLS[DAY][PPL_VERSION].join('\n')
    await bot.sendMessage(chatId, 'Oi oiii. Jangan lupa yang piket beli snack buat hari ini ya om tante. 😘🤤')
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