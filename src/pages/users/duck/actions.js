//import * as ActionTypes from "./types";

import {GET_USERS_ASYNC} from "pages/users/duck/types";

export const getUsersSagaAsync = searchPayload=>{
    return {
        type: GET_USERS_ASYNC,
        payload:searchPayload
    }
}