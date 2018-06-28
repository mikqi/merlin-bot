// Set the configuration for your app
// TODO: Replace with your project's config object
import * as firebase from 'firebase-admin'

const config = {
  credential: firebase.credential.applicationDefault(),
  databaseURL: "https://merlin-bot.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database()