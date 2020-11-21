import api from "./api";
import {
    FETCH_PLAYERS_BY_ID_ERROR,
    FETCH_PLAYERS_BY_ID_SUCCESS,
    FETCH_PLAYERS_BY_ROLE_NAME_ERROR,
    FETCH_PLAYERS_BY_ROLE_NAME_SUCCESS,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_FILTERED_ERROR,
    FETCH_PLAYERS_FILTERED_SUCCESS,
    FETCH_PLAYERS_ORDERED_ERROR,
    FETCH_PLAYERS_ORDERED_SUCCESS,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_WITH_ROLES_ERROR,
    FETCH_PLAYERS_WITH_ROLES_SUCCESS
} from "./footballersContsants";

export const fetchAllWithRoles = () => dispatch => {
    api.footballers().fetchAllWithRoles()
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_WITH_ROLES_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_PLAYERS_WITH_ROLES_ERROR, payload: err });
        });
}

export const fetchAll = () => dispatch => {
    api.footballers().fetchAll()
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_PLAYERS_ERROR, 
                payload: err });
        });
}

export const fetchAllByMatchId= (playerId) => dispatch => {
    api.footballers().fetchById(playerId)
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_BY_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_PLAYERS_BY_ID_ERROR,
                payload: err });
        });
}


export const fetchByRoleName= (roleName) => dispatch => {
    api.footballers().fetchByRoleName(roleName)
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_BY_ROLE_NAME_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_PLAYERS_BY_ROLE_NAME_ERROR,
                payload: err });
        });
}

export const fetchAllFilterBy= (name, surName,nationality) => dispatch => {
    api.footballers().fetchAllFilterBy(name, surName,nationality)
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_FILTERED_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_PLAYERS_FILTERED_ERROR,
                payload: err });
        });
}

export const fetchAllOrderAndSearchBy= (search, orderBy) => dispatch => {
    api.footballers().fetchAllOrderAndSearchBy(search, orderBy)
        .then(response => {
            dispatch({
                type: FETCH_PLAYERS_ORDERED_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type:FETCH_PLAYERS_ORDERED_ERROR,
                payload: err });
        });
}