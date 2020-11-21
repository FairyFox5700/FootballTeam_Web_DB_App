import {
    FETCH_MATCHES_BY_ID_ERROR,
    FETCH_MATCHES_BY_ID_SUCCESS,
    FETCH_MATCHES_ERROR,
    FETCH_MATCHES_SUCCESS,
    FETCH_NEXT_MATCHES_ERROR,
    FETCH_NEXT_MATCHES_SUCCESS
} from "./matchConstants";
const INITIAL_STATE = {
    matches: [],
    match:null,
    statusCodeClass: ''
}

export const matches =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_MATCHES_SUCCESS:
        case FETCH_NEXT_MATCHES_SUCCESS:
            return {
                ...state,
                matches: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_MATCHES_ERROR:
        case FETCH_NEXT_MATCHES_ERROR:
            return {
                ...state,
                matches:  [],
                statusCodeClass: 'error'
            }
        case FETCH_MATCHES_BY_ID_SUCCESS:
            return {
                ...state,
                match:[...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_MATCHES_BY_ID_ERROR:
            return {
                ...state,
                match:null ,
                statusCodeClass: 'error'
            }
        default:
            return state;
    }
}