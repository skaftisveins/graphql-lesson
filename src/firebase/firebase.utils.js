import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBaUZbk_W6pzrTfFJPE-QoAJbtRJoHhSPg",
  authDomain: "crwn-db-ae17c.firebaseapp.com",
  databaseURL: "https://crwn-db-ae17c.firebaseio.com",
  projectId: "crwn-db-ae17c",
  storageBucket: "crwn-db-ae17c.appspot.com",
  messagingSenderId: "234110396870",
  appId: "1:234110396870:web:5ad613babd8d9845daeac7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
