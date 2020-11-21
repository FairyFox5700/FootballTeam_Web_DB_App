import api from "./api";
import {
    FETCH_SEASONS_BY_CLUBID_ERROR,
    FETCH_SEASONS_BY_CLUBID_SUCCESS,
    FETCH_SEASONS_BY_ID_ERROR,
    FETCH_SEASONS_BY_ID_SUCCESS
} from "./seasonesConstants";

export const fetchById = (id) => dispatch => {
    api.seasones().fetchById(id)
        .then(response => {
            dispatch({
                type: FETCH_SEASONS_BY_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_SEASONS_BY_ID_ERROR,
                payload: err });
        });
}

export const fetchAllByClubId = (id) => dispatch => {
    api.seasones().fetchAllByClubId(id)
        .then(response => {
            dispatch({
                type: FETCH_SEASONS_BY_CLUBID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_SEASONS_BY_CLUBID_ERROR,
                payload: err });
        });
}