import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR, FOOTBALL_CLUB_DETAIL_SUCCESS
} from "./footballClubsConstants";
import api from "./api";


export const fetchAll = () => dispatch => {
    api.clubs().fetchAll()
        .then(response => {
            dispatch({
                type: FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_FOOTBALL_CLUB_LIST_ERROR, payload: err });
        }); 
}

export const fetchById = (clubId) => dispatch => {
    api.clubs().fetchById(clubId)
        .then(response => {
            dispatch({
                type: FOOTBALL_CLUB_DETAIL_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FOOTBALL_CLUB_DETAIL_ERROR, payload: err });
        });
}

export const fetchByPlayerId = (playerId) => dispatch => {
    api.clubs().fetchByPlayerId(playerId)
        .then(response => {
            dispatch({
                type: FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, payload: err });
        });
}
