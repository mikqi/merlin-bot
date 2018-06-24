import * as express from 'express'
import * as functions from 'firebase-functions';
import botInterface from './interface';

import { database } from 'firebase-admin';
import * as TelegramBot from 'node-telegram-bot-api'

require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
})

const app = express()

app.get('/anu', (req, res) => {
  res.send('Mamam')
  console.log(`get`)
})

app.get('/testGet', (req, res) => {
  res.send(botInterface.testGet())
})

app.get('/todayEventTest', (req, res) => {
  const todayEvent = botInterface.getTodayEvent();
  console.log(todayEvent);
  res.send(todayEvent);
})

app.get('/todayEvent', (req, res) => {
  botInterface.getTodayEvent().then(response => {
    res.send(response.data);
  }).catch(response =>  {
    console.log(response)
    res.send(response.error)
  })
})

app.get('/getByDate', (req, res) => {
  const query = req.query;
  botInterface.getByDate(query.starDate, query.endDate).then(response => {
    res.send(response.data);
  }).catch(response => {
    console.log(response)
    res.send(response.error)
  })
})
require('./merlin/help')(bot)
require('./merlin/setting')(bot)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.app = functions.https.onRequest(app);
