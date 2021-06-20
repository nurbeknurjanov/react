import * as ActionTypes from "./types";

export const setLoader = payload => {
    return {
        type: ActionTypes.SET_LOADER,
        payload:payload
    }
}
export const startLoading = ()=>setLoader(true);
export const endLoading = ()=>setLoader(false);


export const setAuthorizedUserAction = payload => {
    return {
        type: ActionTypes.SET_AUTHORIZED_USER,
        payload:payload
    }
}
export const initApplication = payload => ({
    type: ActionTypes.INIT_APPLICATION,
    payload,
});

export const setTitle = title => {
    return {
        type: ActionTypes.SET_TITLE,
        payload:title,
    };
};
export const clearTitle = () => ({
    type: ActionTypes.CLEAR_TITLE,
});

export const addButton = button => ({
    type: ActionTypes.SET_BUTTON,
    payload:button,
});
export const clearButtons = () => ({
    type: ActionTypes.CLEAR_BUTTONS,
});

export const setBreadcrumbs = payload => ({
    type: ActionTypes.SET_BREADCRUMBS,
    payload:payload,
});
export const clearBreadcrumbs = () => ({
    type: ActionTypes.CLEAR_BREADCRUMBS,
});

export const addAlert = (key, text) => ({
    type: ActionTypes.ADD_ALERT,
    payload: {key, text},
});
export const setAlert = (key, text) => ({
    type: ActionTypes.SET_ALERT,
    payload: {key, text},
});
export const removeAlert = key => ({
    type: ActionTypes.REMOVE_ALERT,
    payload:key,
});
export const clearAlerts = () => ({
    type: ActionTypes.CLEAR_ALERTS,
});

export const addFlash = (key, text) => ({
    type: ActionTypes.ADD_FLASH,
    payload: {key, text},
});
export const removeFlash = key => ({
    type: ActionTypes.REMOVE_FLASH,
    payload:key,
});
export const clearFlashes = () => ({
    type: ActionTypes.CLEAR_FLASHES,
});


export const setError = error => ({
    type: ActionTypes.SET_ERROR,
    payload: error,
});
export const clearError = () => ({
    type: ActionTypes.CLEAR_ERROR,
});
export const incrementAction = () => ({
    type: ActionTypes.INCREMENT,
});
export const incrementActionAsync = () => ({
    type: ActionTypes.ASYNC_INCREMENT,
});

export const clearAll = () => async (dispatch, getState)=>{
    dispatch({type:ActionTypes.CLEAR_ALL});
    dispatch({type:ActionTypes.CLEAR_FLASHES});
};

export const testAction = () => ({
    type: 'test',
});



