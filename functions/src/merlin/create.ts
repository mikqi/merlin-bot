import { Message } from 'node-telegram-bot-api'
import { readUserData } from '../db/user'
import axios from 'axios'
import { createEvent } from '../interface'
import { convertListEvents } from '../utils'

const TYPES = ['group', 'supergroup']
const URL = 'https://teamup.com/ksba33b1dec7c75214/events'

module.exports = function (bot) {
  bot.onText(/\/buat_event/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const teamupURL = await readUserData(chatId)

    if (TYPES.indexOf(type) >= 0) {
      return bot.sendMessage(chatId, `Japri aku aja dong @${msg.from.username} sayang biar lebih intim. 😘`)
    }

    const payload = {
      start_dt: '',
      end_dt: '',
      all_day: true,
      title: '',
      who: `${msg.from.first_name} ${msg.from.last_name}`,
      subcalendar_id: process.env.SUB_CALENDAR_ID
    }

    const opts = {
      reply_markup: JSON.stringify({ force_reply: true }
    )};

    await bot.sendMessage(chatId, 'Masukkan Nama event? (Remote, Cuti, GH, Sick Leave)', opts)
      .then( async ({message_id}) => {
        await bot.onReplyToMessage(chatId, message_id, async (responseLabel: Message) => {
          payload.title = responseLabel.text

          await bot.sendMessage(chatId, 'Masukkan tanggal event? (format: YYYY-MM-DD)', opts)
            .then( async ({message_id: messageId}) => {
              await bot.onReplyToMessage(chatId, messageId, async (responseDate: Message) => {
                payload.start_dt = responseDate.text

                await bot.sendMessage(chatId, 'Masukkan tanggal masuk? (format: YYYY-MM-DD)', opts)
                  .then( async ({message_id: messageId}) => {
                    await bot.onReplyToMessage(chatId, messageId, async (responseEndDate: Message) => {
                      payload.end_dt = responseEndDate.text
                      const HEADERS = { headers: { 'Teamup-Token': process.env.API_KEY }}

                      axios.post(URL, payload, HEADERS)
                        .then(_ => {
                          bot.sendMessage(chatId, `Berhasil menambahkan pada tanggal ${payload.start_dt} - ${payload.end_dt}`)
                        })
                        .catch(_ => {
                          bot.sendMessage(chatId, 'Gagal menambahkan ke Teamup')
                        })
                    
                    })
                  } )
              })
            })
        })
      })

  })
}

// const { data, error } = await createEvent(payload, URL)

// if (TYPES.indexOf(type) >= 0 && !error)  {
//   const { events } = data
//   const listEvents = convertListEvents(events)
//   bot.sendMessage(chatId, listEvents)
//   bot.sendMessage(chatId, `versi lengkapnya bisa ceki ceki [dimari](${teamupURL[1]}) sis`, {
//     parse_mode: 'Markdown'
//   })
// } else if (error) {
//   console.log(error)
//   bot.sendMessage(chatId, JSON.stringify(error))
//   bot.sendMessage(chatId, 'Atur ulang id teamupnya dong. /atur', {
//     parse_mode: 'Markdown'
//   })
// }
