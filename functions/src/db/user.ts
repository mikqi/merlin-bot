
import { db } from './config';
import * as functions from 'firebase-functions';

export const writeUserData = (telegramId, teamupId, teamupLink) => {
  db.ref('users/' + telegramId).set({
    teamupId: teamupId,
    teamupLink : teamupLink
  });
}

export const readUserData = (userId) => {
  return new Promise ((resolve, reject) => {
    db.ref('/users/' + userId).once('value').then(function(snapshot) {
      const teamupLink = (snapshot.val() && snapshot.val().teamupLink) || 'Anonymous'
      const teamupId = (snapshot.val() && snapshot.val().teamupId) || 'Anonymous'
      resolve([teamupId, teamupLink]);
    });
  })
}

 