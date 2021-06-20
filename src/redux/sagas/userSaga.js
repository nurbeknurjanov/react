import {/*put,*/ takeEvery, call} from "redux-saga/effects";
import {GET_USERS_ASYNC} from "pages/users/duck";
import {getUsers} from "api/users";
//import {setUsersSaga} from "pages/users/duck/actions";

const delay = (ms)=> new Promise(r=>setTimeout(r, ms));

export function* fetchUsersWorker({payload}) {
    yield delay(1000);
    const data = yield call(getUsers.bind(null, payload));
    yield delay(1000);
    console.log(data)
    //yield put(setUsersSaga(data));
    /*const json = yield call(
        _=>new Promise(
            resolve=>resolve(data.json())
        )
    );*/
}
export function* qwe() {

}


export function* userWatcher() {
    yield takeEvery('other', qwe);
    yield takeEvery(GET_USERS_ASYNC, fetchUsersWorker);
}


