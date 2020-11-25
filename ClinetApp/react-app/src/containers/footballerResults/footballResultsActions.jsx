import api from "./api";
import {
    FETCH_RESULT_BY_MATCH_ID_ERROR,
    FETCH_RESULT_BY_MATCH_ID_SUCCESS, FETCH_RESULTS_WITH_PLAYERS_ERROR, FETCH_RESULTS_WITH_PLAYERS_REQUEST,
    FETCH_RESULTS_WITH_PLAYERS_SUCCESS
} from "./footballResultsConstants";
import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR, FOOTBALL_CLUB_DETAIL_ERROR,
    FOOTBALL_CLUB_DETAIL_REQUEST,
    FOOTBALL_CLUB_DETAIL_SUCCESS
} from "../clubs/footballClubsConstants";


export const fetchAllByMatchId= (matchId) => dispatch => {
    api.footballResults().fetchAllByMatchId(matchId)
        .then(response => {
            dispatch({
                type: FETCH_RESULT_BY_MATCH_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_RESULT_BY_MATCH_ID_ERROR,
                payload: err })
        });
}

export const fetchAllWithPlayers= () => async dispatch => {
    try{
        dispatch({ type: FETCH_RESULTS_WITH_PLAYERS_REQUEST });
        const { data } = await  api.footballResults().fetchAllWithPlayers();
        console.log(data.data)
        dispatch({ type:FETCH_RESULTS_WITH_PLAYERS_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FETCH_RESULTS_WITH_PLAYERS_ERROR, payload: err.message  });
    }
}

