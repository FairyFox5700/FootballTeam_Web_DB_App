import {
    FETCH_RESULT_BY_MATCH_ID_ERROR,
    FETCH_RESULT_BY_MATCH_ID_SUCCESS,
    FETCH_RESULTS_WITH_PLAYERS_ERROR,
    FETCH_RESULTS_WITH_PLAYERS_REQUEST,
    FETCH_RESULTS_WITH_PLAYERS_SUCCESS, FETCH_TOTAL_RESULTS_BY_MATCH_ID_ERROR,
    FETCH_TOTAL_RESULTS_BY_MATCH_ID_REQUEST,
    FETCH_TOTAL_RESULTS_BY_MATCH_ID_SUCCESS,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_ERROR,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_REQUEST,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_SUCCESS
} from "./footballResultsConstants";

const INITIAL_STATE = {
    results: [],
    error:'',
    loading:false,
}

export const footballResults = (state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_RESULTS_WITH_PLAYERS_REQUEST:
        case FETCH_TOTAL_RESULTS_BY_PLAYER_ID_REQUEST:
        case FETCH_TOTAL_RESULTS_BY_MATCH_ID_REQUEST:
            return {
                loading: true
            }
        case FETCH_TOTAL_RESULTS_BY_MATCH_ID_SUCCESS:
        case FETCH_TOTAL_RESULTS_BY_PLAYER_ID_SUCCESS:
            return {
                loading: false,
                result:  action.payload,
            }
        case FETCH_RESULTS_WITH_PLAYERS_SUCCESS:
        case FETCH_RESULT_BY_MATCH_ID_SUCCESS:
            return {
                loading: false,
                results:  action.payload,
            }
        case FETCH_RESULTS_WITH_PLAYERS_ERROR:
        case  FETCH_RESULT_BY_MATCH_ID_ERROR:
        case FETCH_TOTAL_RESULTS_BY_MATCH_ID_ERROR:
        case FETCH_TOTAL_RESULTS_BY_PLAYER_ID_ERROR:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }

}