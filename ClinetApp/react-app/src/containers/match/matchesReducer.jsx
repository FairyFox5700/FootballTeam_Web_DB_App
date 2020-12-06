import {
    FETCH_MATCHES_BY_ID_ERROR,
    FETCH_MATCHES_BY_ID_SUCCESS,
    FETCH_MATCHES_ERROR, FETCH_MATCHES_REQUEST,
    FETCH_MATCHES_SUCCESS,
    FETCH_NEXT_MATCHES_ERROR, FETCH_NEXT_MATCHES_REQUEST,
    FETCH_NEXT_MATCHES_SUCCESS
} from "./matchConstants";

const INITIAL_STATE = {
    matches: [],
    loading:true,
    error:''
}

export const matches =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
    
        case FETCH_NEXT_MATCHES_REQUEST:
        case FETCH_MATCHES_REQUEST:
            return { loading: true };
            
        case FETCH_MATCHES_SUCCESS:
        case FETCH_NEXT_MATCHES_SUCCESS:
            return {
                loading: false,
                matches: action.payload
            }
        case FETCH_MATCHES_ERROR:
        case FETCH_NEXT_MATCHES_ERROR:
        case FETCH_MATCHES_BY_ID_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case FETCH_MATCHES_BY_ID_SUCCESS:
            return {
                ...state,
                match:[...action.payload] ,
                statusCodeClass: 'ok'
            }
        default:
            return state;
    }
}