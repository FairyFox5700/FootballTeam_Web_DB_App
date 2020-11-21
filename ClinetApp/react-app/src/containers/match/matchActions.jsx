import {
    FETCH_MATCHES_BY_ID_ERROR,
    FETCH_MATCHES_BY_ID_SUCCESS,
    FETCH_MATCHES_ERROR,
    FETCH_MATCHES_SUCCESS, FETCH_NEXT_MATCHES_ERROR, FETCH_NEXT_MATCHES_SUCCESS
} from "./matchConstants";
import api from "./api";


export const fetchAll = () => dispatch => {
    api.matches().fetchAll()
        .then(response => {
            dispatch({
                type: FETCH_MATCHES_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_MATCHES_ERROR,
                payload: err });
        });
}

export const fetchById = (matchId) => dispatch => {
    api.matches().fetchById(matchId)
        .then(response => {
            dispatch({
                type: FETCH_MATCHES_BY_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_MATCHES_BY_ID_ERROR,
                payload: err });
        });
}

export const fetchNextMatches= () => dispatch => {
    api.matches().fetchNextMatches()
        .then(response => {
            dispatch({
                type: FETCH_NEXT_MATCHES_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_NEXT_MATCHES_ERROR,
                payload: err });
        });
}