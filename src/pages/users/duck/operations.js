/*import {getUsers as getUsersApi,
    getUser as getUserApi,
    createUser as createUserApi
} from 'api/users';
import {setUsersAction, setUserAction} from './actions';
import {endLoading, startLoading, setPaginationAction} from '../../duck';
import awaitToJs from "await-to-js";
import {setError} from "pages/duck/actions";*/

//void functions
//no returns, because a lot data,
//it does catch errors, and handles data to redux,
//here is a return only functions for thunk dispatch
/*
export function getUsersOperation({filter, page, perPage}) {
    return async (dispatch, getState)=>{
        //const {filter} = getState().user;
        dispatch(startLoading());
        //const [e, results] = await awaitToJs(getUsersApi()) ;
        try{
            const results = await getUsersApi({filterName:filter, page, perPage});
            dispatch(endLoading());

            dispatch(setUsersAction(results.usersList));
            dispatch(setPaginationAction(results.paginationParams));
        }catch (e) {
            dispatch(endLoading());
            alert(e.message);
        }
    }
}
*/


/*export const getUserOperation = (id) =>
    async (dispatch, getState)=>{
        try {
            const result = await getUserApi(id);
            dispatch(setUserAction(result));
        }catch (e) {
            //throw new Error(e);
            dispatch(setError(e));
        }
    }*/