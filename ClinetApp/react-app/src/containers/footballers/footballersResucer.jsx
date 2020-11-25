import {
    FETCH_PLAYERS_BY_ID_ERROR, FETCH_PLAYERS_BY_ID_REQUEST,
    FETCH_PLAYERS_BY_ID_SUCCESS,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_WITH_ROLES_ERROR,
    FETCH_PLAYERS_WITH_ROLES_SUCCESS
} from "./footballersContsants";
import {FOOTBALL_CLUB_DETAIL_ERROR} from "../clubs/footballClubsConstants";

const INITIAL_STATE = {
    footballers: [],
    footballer:null,
    loading:true,
    error:''
}

export const footballers =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                footballers:  [...action.payload] ,
                footballer:null,
                statusCodeClass: 'ok'
            }
        case FETCH_PLAYERS_ERROR:
            return {
                ...state,
                footballers:  [],
                footballer:null,
                statusCodeClass: 'error'
            }
        case FETCH_PLAYERS_WITH_ROLES_SUCCESS:
            return {
                ...state,
                footballers:  [...action.payload] ,
                footballer:null,
                statusCodeClass: 'ok'
            }
        case FETCH_PLAYERS_WITH_ROLES_ERROR:
            return {
                ...state,
                footballers:  [],
                footballer:null,
            }

        case FOOTBALL_CLUB_DETAIL_ERROR:
        return {
            loading: false,
        }
        case FETCH_PLAYERS_BY_ID_REQUEST:
            return { loading: true };
        case FETCH_PLAYERS_BY_ID_SUCCESS:
        return {
            loading: false,
            footballer: action.payload
        }
        case FETCH_PLAYERS_BY_ID_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}