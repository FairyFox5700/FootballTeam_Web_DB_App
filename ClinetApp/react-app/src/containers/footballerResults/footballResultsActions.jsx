import api from "./api";
import {
    FETCH_RESULT_BY_MATCH_ID_ERROR,
    FETCH_RESULT_BY_MATCH_ID_SUCCESS,
    FETCH_RESULTS_WITH_PLAYERS_ERROR,
    FETCH_RESULTS_WITH_PLAYERS_REQUEST,
    FETCH_RESULTS_WITH_PLAYERS_SUCCESS,
    FETCH_TOTAL_RESULTS_BY_MATCH_ID_ERROR, FETCH_TOTAL_RESULTS_BY_MATCH_ID_REQUEST,
    FETCH_TOTAL_RESULTS_BY_MATCH_ID_SUCCESS,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_ERROR,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_REQUEST,
    FETCH_TOTAL_RESULTS_BY_PLAYER_ID_SUCCESS
} from "./footballResultsConstants";
import axios from "axios";


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

export const fetchTotalResultsByMatchId= (matchId) => async dispatch => {
    try{
        dispatch({ type: FETCH_TOTAL_RESULTS_BY_MATCH_ID_REQUEST });
        const { data } = await  api.footballResults().fetchAllByMatchId(matchId)
        console.log(data.data)
        dispatch({ type:FETCH_TOTAL_RESULTS_BY_MATCH_ID_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FETCH_TOTAL_RESULTS_BY_MATCH_ID_ERROR, payload: err.message  });
    }
}

export const fetchTotalResultsByPlayerId= (playerId) => async dispatch => {
    try{
        dispatch({ type: FETCH_TOTAL_RESULTS_BY_PLAYER_ID_REQUEST });
        const { data } = await  api.footballResults().fetchTotalResultsByPlayerId(playerId)
        console.log(data.data)
        dispatch({ type:FETCH_TOTAL_RESULTS_BY_PLAYER_ID_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FETCH_TOTAL_RESULTS_BY_PLAYER_ID_ERROR, payload: err.message  });
    }
}
