import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR,
    FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR,
    FOOTBALL_CLUB_DETAIL_SUCCESS
} from "./footballClubsConstants.jsx";


const INITIAL_STATE = {
    clubs: [],
    club: null,
    message: '',
    statusCode: 0,
    statusCodeClass: ''
}

export const clubs =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_FOOTBALL_CLUB_LIST_SUCCESS:
            return {
                ...state,
                clubs:  [...action.payload] ,
                club: null,
                message: null,
                statusCode: null,
                statusCodeClass: 'ok'
            }
        case FETCH_FOOTBALL_CLUB_LIST_ERROR:
            return {
                ...state,
                message: action.payload.message,
                statusCode: action.payload.statusCode,
                statusCodeClass: 'error'
            }
        case FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR:
            return {
                ...state,
                message: action.payload.message,
                statusCode: action.payload.statusCode,
                statusCodeClass: 'error'
            }
        case  FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS:
            return {
                ...state,
                clubs: action.payload.result,
                club: null,
                message: action.payload.message,
                statusCode: action.payload.statusCode,
                statusCodeClass: 'ok'
            }
        case FOOTBALL_CLUB_DETAIL_SUCCESS:
            return {
                ...state,
                clubs: null,
                club: action.payload.result,
                message: action.payload.message,
                statusCode: action.payload.statusCode,
                statusCodeClass: 'ok'
            }
        case FOOTBALL_CLUB_DETAIL_ERROR:
            return {
                ...state,
                message: action.payload.message,
                statusCode: action.payload.statusCode,
                statusCodeClass: 'error'
            }
        default:
            return state;
    }

}