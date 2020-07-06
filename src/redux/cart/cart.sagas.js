import { all, call, takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.action';


export function* clearCartOnSignout() {
    yield put(clearCart());
}
export function* onUserLogOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignout)
}
export function* cartSagas() {
    yield all([
        call(onUserLogOut)
    ]);
}