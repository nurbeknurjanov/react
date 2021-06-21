import initialState from "./schema";
import {
    SET_LOADER,
    SET_AUTHORIZED_USER,
    INIT_APPLICATION,
    SET_TITLE,
    SET_BUTTON,
    CLEAR_BUTTONS,
    SET_BREADCRUMBS,
    ADD_ALERT,
    REMOVE_ALERT,
    CLEAR_ALERTS,
    CLEAR_BREADCRUMBS,
    CLEAR_TITLE,
    SET_ERROR,
    CLEAR_ERROR,
    CLEAR_ALL,
    ADD_FLASH,
    REMOVE_FLASH,
    CLEAR_FLASHES, SET_ALERT, INCREMENT
} from "./types";
const reducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADER:{
            return { ...state,
                loading: action.payload
            }
        }
        case SET_AUTHORIZED_USER:{
            return { ...state,
                authorizedUser: action.payload
            }
        }
        case INIT_APPLICATION:{
            return { ...state,
                init: action.payload
            }
        }
        case SET_TITLE:{
            return { ...state,
                title: action.payload
            }
        }
        case CLEAR_TITLE:{
            return { ...state,
                title: null
            }
        }
        case SET_BUTTON:{
            return { ...state,
                buttons: [...state.buttons, action.payload]
            }
        }
        case CLEAR_BUTTONS:{
            return { ...state,
                buttons: []
            }
        }
        case SET_BREADCRUMBS:{
            return { ...state,
                breadcrumbs: action.payload
            }
        }
        case CLEAR_BREADCRUMBS:{
            return { ...state,
                breadcrumbs: []
            }
        }
        case ADD_ALERT:{
            return { ...state,
                alerts: [...state.alerts, action.payload]
            }
        }
        case SET_ALERT:{
            return { ...state,
                alerts: [action.payload]
            }
        }
        case REMOVE_ALERT:{
            return { ...state,
                alerts: state.alerts.filter(el=>el.key!==action.payload)
            }
        }
        case CLEAR_ALERTS:{
            return { ...state,
                alerts: []
            }
        }

        case ADD_FLASH:{
            return { ...state,
                flashesToShow: [...state.flashesToShow, action.payload],
            }
        }
        case REMOVE_FLASH:{
            return { ...state,
                flashesToShow: state.flashesToShow.filter(el=>el.key!==action.payload),
                flashes: state.flashes.filter(el=>el.key!==action.payload),
                flashesToRemove: state.flashesToRemove.filter(el=>el.key!==action.payload),
            }
        }
        case CLEAR_FLASHES:{

            let flashesToRemove = state.flashesToRemove;
            let flashes = state.flashes;

            flashes = flashes.filter(el=>!(flashesToRemove.map(el=>el.key).includes(el.key)));//flashes cleared
            flashes = [...flashes, ...state.flashesToShow];
            flashesToRemove = [...flashes];
            return { ...state,
                flashes: flashes,
                flashesToRemove: flashesToRemove,
                flashesToShow: [],
            }
        }

        case SET_ERROR:{
            return { ...state,
                error: action.payload
            }
        }
        case CLEAR_ERROR:{
            return { ...state,
                error: null
            }
        }
        case CLEAR_ALL:{

            return { ...state,
                title: null,
                error: null,
                alerts: [],
                breadcrumbs: [],
                buttons: [],
            }
        }
        case INCREMENT:{
            return { ...state,
                count: state.count+1
            }
        }
        default:
            return state;
    }
};
export default reducer;