import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR, FETCH_FOOTBALL_CLUB_LIST_REQUEST,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, FOOTBALL_CLUB_BY_PLAYER_LIST_REQUEST, FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR, FOOTBALL_CLUB_DETAIL_REQUEST, FOOTBALL_CLUB_DETAIL_SUCCESS
} from "./footballClubsConstants";
import api from "./api";
import {
    FETCH_RESULTS_WITH_PLAYERS_ERROR,
    FETCH_RESULTS_WITH_PLAYERS_REQUEST,
    FETCH_RESULTS_WITH_PLAYERS_SUCCESS
} from "../footballerResults/footballResultsConstants";

export const fetchById = (clubId) => async dispatch => {
    try{
        dispatch({ type: FOOTBALL_CLUB_DETAIL_REQUEST });
        console.log(clubId);
        const { data } = await api.clubs().fetchById(clubId);
        console.log(data.data)
        dispatch({ type:FOOTBALL_CLUB_DETAIL_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FOOTBALL_CLUB_DETAIL_ERROR, payload: err.message  });
    }
}

export const fetchAll= () => async dispatch => {
    try{
        dispatch({ type: FETCH_FOOTBALL_CLUB_LIST_REQUEST });
        const { data } = await  api.clubs().fetchAll();
        console.log(data.data)
        dispatch({ type:FETCH_FOOTBALL_CLUB_LIST_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FETCH_FOOTBALL_CLUB_LIST_SUCCESS, payload: err.message  });
    }
}

export const fetchByPlayerId = (playerId) => async dispatch => {
    try{
        dispatch({ type: FOOTBALL_CLUB_BY_PLAYER_LIST_REQUEST });
        const { data } = await  api.clubs().fetchByPlayerId(playerId);
        console.log(data.data)
        dispatch({ type:FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, payload: err.message  });
    }
}
