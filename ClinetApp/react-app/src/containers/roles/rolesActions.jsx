import api from "./api";
import {
    FETCH_ROLES_BY_NAME_ERROR,
    FETCH_ROLES_BY_NAME_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_SUCCESS
} from "./rolesConstants";

export const fetchAllByName = (name) => dispatch => {
    api.roles().fetchAllByName(name)
        .then(response => {
            dispatch({
                type: FETCH_ROLES_BY_NAME_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_ROLES_BY_NAME_ERROR,
                payload: err });
        });
}

export const fetchAll = () => dispatch => {
    api.roles().fetchAll()
        .then(response => {
            dispatch({
                type: FETCH_ROLES_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_ROLES_ERROR,
                payload: err });
        });
}