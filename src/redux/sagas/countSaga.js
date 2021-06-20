import {put, takeEvery} from "redux-saga/effects";
import {ASYNC_INCREMENT} from "pages/duck/types";
import {incrementAction} from "pages/duck";

const delay = (ms)=> new Promise(r=>setTimeout(r, ms));

export function* incrementWorker() {
    yield delay(1000);
    yield put(incrementAction())
}


export function* countWatcher() {
    yield takeEvery(ASYNC_INCREMENT, incrementWorker)
}


