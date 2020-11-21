import {
    FETCH_RESULT_BY_MATCH_ID_ERROR,
    FETCH_RESULT_BY_MATCH_ID_SUCCESS, FETCH_RESULTS_WITH_PLAYERS_ERROR,
    FETCH_RESULTS_WITH_PLAYERS_SUCCESS
} from "./footballResultsConstants";

const INITIAL_STATE = {
    results: [],
    statusCodeClass: ''
}

export const footballResults = (state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_RESULTS_WITH_PLAYERS_SUCCESS:
        case FETCH_RESULT_BY_MATCH_ID_SUCCESS:
            return {
                ...state,
                results:  [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_RESULTS_WITH_PLAYERS_ERROR:
        case  FETCH_RESULT_BY_MATCH_ID_ERROR:
            return {
                ...state,
                results:[],
                statusCodeClass: 'error'
            }
        default:
            return state;
    }

}