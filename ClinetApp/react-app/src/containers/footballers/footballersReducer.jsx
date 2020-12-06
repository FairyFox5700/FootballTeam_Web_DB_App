import {
    ADD_PLAYERS_WITH_ROLES_REQUEST, ADD_PLAYERS_WITH_ROLES_REQUEST_ERROR, DELETE_PLAYERS_REQUEST,
    FETCH_PLAYERS_BY_ID_ERROR, FETCH_PLAYERS_BY_ID_REQUEST,
    FETCH_PLAYERS_BY_ID_SUCCESS,
    FETCH_PLAYERS_ERROR, FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_WITH_ROLES_ERROR, FETCH_PLAYERS_WITH_ROLES_REQUEST,
    FETCH_PLAYERS_WITH_ROLES_SUCCESS, UPDATE_PLAYERS_WITH_ROLES_REQUEST, UPDATE_PLAYERS_WITH_ROLES_REQUEST_ERROR
} from "./footballersContsants";
import {FOOTBALL_CLUB_DETAIL_ERROR} from "../clubs/footballClubsConstants";

const INITIAL_STATE = {
    footballers: [],
    footballer: {},
    loading:true,
    error:''
}

export const footballers =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case ADD_PLAYERS_WITH_ROLES_REQUEST:
            return {
                ...state,
                footballers: [state.footballers, action.payload]
            }
        case UPDATE_PLAYERS_WITH_ROLES_REQUEST:
            return {
                ...state,
                footballers: state.footballers.map(x => x.personId == action.payload.playerId  ? action.payload : x)
            }
        case DELETE_PLAYERS_REQUEST:
            return {
                ...state,
                footballers:state.list.filter(x => x.personId != action.payload)
            }
        case FETCH_PLAYERS_SUCCESS:
            return {
                loading: false,
                footballers: action.payload
            }
        case FETCH_PLAYERS_ERROR:
        case ADD_PLAYERS_WITH_ROLES_REQUEST_ERROR:
        case UPDATE_PLAYERS_WITH_ROLES_REQUEST_ERROR:
        case FETCH_PLAYERS_WITH_ROLES_ERROR:
        case FETCH_PLAYERS_BY_ID_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case FETCH_PLAYERS_WITH_ROLES_SUCCESS:
            return {
                loading: false,
                footballers: action.payload
            }
        case FETCH_PLAYERS_BY_ID_REQUEST:
        case FETCH_PLAYERS_WITH_ROLES_REQUEST:
        case FETCH_PLAYERS_REQUEST:
            return { loading: true };
        case FETCH_PLAYERS_BY_ID_SUCCESS:
        return {
            loading: false,
            footballer: action.payload
        }
        default:
            return state;
    }

}