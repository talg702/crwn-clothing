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

export const createUserProfileDocument = async (userAuth, AdditionalData) => {
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
                ...AdditionalData
            })
        } catch(error) {
            console.log('error creating user',error.message);
        }
        
    }
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;