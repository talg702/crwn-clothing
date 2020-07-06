import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

function* signIn(getUserAuth) {
    try {
        const userAuth = yield getUserAuth();
        const userRef = yield call(createUserProfileDocument, userAuth);
        if (userRef) {
            const userSnapShot = yield userRef.get();
            yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
        }
    } catch(error) {
        yield put(signInFailure(error))
    }

}
export function* signInWithGoogle() {
    yield signIn(() => auth.signInWithPopup(googleProvider));
}
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload : { email, password }}) {
    yield signIn(() => auth.signInWithEmailAndPassword(email, password))
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
    yield signIn(() => getCurrentUser());
}
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        console.log("Going to signout");
        yield auth.signOut();
        console.log("after signout");
        yield put(signOutSuccess());
    } catch (error) {
        console.log("after signout - got error",error);

        yield put(signOutFailure(error));
    }
}
export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* doSignUp({ payload: {displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield createUserProfileDocument(user, { displayName });            
        yield put(signUpSuccess(user));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* doSignInAfterSignUp(user) {
    console.log("in doSignInAfterSignUp")
    yield signIn(() => user);
}
export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, doSignInAfterSignUp);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, doSignUp);
}
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}