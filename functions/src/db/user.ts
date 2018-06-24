
import { db } from './config';
import * as functions from 'firebase-functions';

export const writeUserData = (userId, name, email, imageUrl) => {
  db.ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

export const readUserData = (userId) => {
  return db.ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });
}

 