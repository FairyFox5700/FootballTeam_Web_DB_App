import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR,
    FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR,
    FOOTBALL_CLUB_DETAIL_SUCCESS,
    FOOTBALL_CLUB_DETAIL_REQUEST
} from "./footballClubsConstants.jsx";
import {FETCH_FOOTBALL_CLUB_LIST_REQUEST, FOOTBALL_CLUB_BY_PLAYER_LIST_REQUEST} from "./footballClubsConstants";

const INITIAL_STATE = {
    clubs: [],
    club: {},
    loading: true,
    error:''
}

export const clubs =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FOOTBALL_CLUB_DETAIL_SUCCESS:
            return {
                loading: false,
                club: action.payload
            }
        case FETCH_FOOTBALL_CLUB_LIST_REQUEST:
        case FOOTBALL_CLUB_DETAIL_REQUEST:
        case FOOTBALL_CLUB_BY_PLAYER_LIST_REQUEST:
            return { loading: true };
        case  FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS:
        case FETCH_FOOTBALL_CLUB_LIST_SUCCESS:
            return {
                loading: false,
                clubs: action.payload 
            }
        case FOOTBALL_CLUB_DETAIL_ERROR:
        case FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR:
        case FETCH_FOOTBALL_CLUB_LIST_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}