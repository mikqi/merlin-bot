import { Message } from 'node-telegram-bot-api'
import { readUserData } from '../db/user'
import axios from 'axios'

const TYPES = ['group', 'supergroup']
const URL = 'https://teamup.com/ksba33b1dec7c75214/events'

module.exports = function (bot) {
  bot.onText(/\/buat_leave/, async (msg: Message) => {
    const chatId = msg.chat.id
    const type = msg.chat.type
    const todayDate = new Date()
    const TODAY = `${todayDate.getFullYear()}-${todayDate.getMonth().toString().length > 1 ? todayDate.getMonth() + 1 : '0' + (todayDate.getMonth() + 1)}-${todayDate.getDate()}`

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

    await bot.sendMessage(chatId, 'Masukkan Nama event dulu dong say? (Remote, Cuti, GH, Sick Leave)', opts)
      .then( async ({message_id}) => {
        await bot.onReplyToMessage(chatId, message_id, async (responseLabel: Message) => {
          payload.title = responseLabel.text

          await bot.sendMessage(chatId, `Mulai tanggal berapa nih? Sekarang tuh tanggal ${TODAY}. (format: YYYY-MM-DD)`, opts)
            .then( async ({message_id: messageId}) => {
              await bot.onReplyToMessage(chatId, messageId, async (responseDate: Message) => {
                payload.start_dt = responseDate.text

                await bot.sendMessage(chatId, 'Mau balik lagi ke kantor kapan say? (format: YYYY-MM-DD)', opts)
                  .then( async ({message_id: messageId}) => {
                    await bot.onReplyToMessage(chatId, messageId, async (responseEndDate: Message) => {
                      bot.sendMessage(chatId, 'Oke sebentar say, Merlin tambahin dulu ya.. 🏃🏻‍')
                      payload.end_dt = responseEndDate.text
                      const HEADERS = { headers: { 'Teamup-Token': process.env.API_KEY }}

                      axios.post(URL, payload, HEADERS)
                        .then(_ => {
                          bot.sendMessage(chatId, `Yeiyyy kamu sudah menambahkan ${payload.title} untuk tanggal ${payload.start_dt} sampai ${payload.end_dt}. Take care baby. 😘`)
                        })
                        .catch(_ => {
                          bot.sendMessage(chatId, 'Aduhhh.. Kayanya ada yang salah deh 😢 Coba lagi atau bisa tanya ke bro @mikqi atau bro @gazandi yaa. 😘')
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
