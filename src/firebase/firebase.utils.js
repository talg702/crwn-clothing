import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDfYvh7NVWEYBWcfgGgmzw_uva6CyyARTY",
    authDomain: "market-crwn-db.firebaseapp.com",
    databaseURL: "https://market-crwn-db.firebaseio.com",
    projectId: "market-crwn-db",
    storageBucket: "market-crwn-db.appspot.com",
    messagingSenderId: "932579837961",
    appId: "1:932579837961:web:6efc85628c3c60348b10d8",
    measurementId: "G-H6YHC53V6S"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;