import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR,
    FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR,
    FOOTBALL_CLUB_DETAIL_SUCCESS,
    FOOTBALL_CLUB_DETAIL_REQUEST
} from "./footballClubsConstants.jsx";



const INITIAL_STATE = {
    clubs: [],
    club: {},
    message: '',
    statusCode: 0,
    loading: true,
    error:''
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
                statusCodeClass: 'ok'
            }
        case FETCH_FOOTBALL_CLUB_LIST_ERROR:
            return {
                ...state,
                statusCodeClass: 'error'
            }
        case FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR:
            return {
                ...state,
                statusCodeClass: 'error'
            }
        case  FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS:
            return {
                ...state,
                clubs: action.payload.result,
                club: null,
                statusCodeClass: 'ok'
            }
        case FOOTBALL_CLUB_DETAIL_REQUEST:
            return { loading: true };
        case FOOTBALL_CLUB_DETAIL_SUCCESS:
            return {
                loading: false,
                clubs: [],
                club: action.payload 
            }
        case FOOTBALL_CLUB_DETAIL_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}