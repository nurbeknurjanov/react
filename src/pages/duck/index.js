import reducer from "./reducer";

export default reducer;

export {setLoader, startLoading, endLoading,
    setAuthorizedUserAction, initApplication,
    setTitle,
    clearTitle,
    addButton,
    clearButtons,
    setBreadcrumbs,
    clearBreadcrumbs,
    addAlert,
    setAlert,
    removeAlert,
    clearAlerts,
    addFlash,
    removeFlash,
    clearFlashes,
    setError,
    clearError,
    clearAll,
    incrementAction,
} from './actions';

export {getBreadcrumbsSelector} from './selectors';