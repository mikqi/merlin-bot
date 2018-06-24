import * as express from 'express'
import * as functions from 'firebase-functions';
import botInterface from './interface';


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
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.app = functions.https.onRequest(app);
