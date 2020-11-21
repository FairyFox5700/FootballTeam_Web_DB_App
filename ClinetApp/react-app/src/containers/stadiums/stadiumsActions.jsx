import api from "./api";
import {
    FETCH_STADIUMS_BY_CLUBID_ERROR,
    FETCH_STADIUMS_BY_CLUBID_SUCCESS,
    FETCH_STADIUMS_BY_ID_ERROR,
    FETCH_STADIUMS_BY_ID_SUCCESS
} from "./stadiumsConstants";
export const fetchAllByClubId = (clubId) => dispatch => {
    api.stadiums().fetchAllByClubId(clubId)
        .then(response => {
            dispatch({
                type: FETCH_STADIUMS_BY_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type:FETCH_STADIUMS_BY_ID_ERROR,
                payload: err });
        });
}

export const fetchById = (id) => dispatch => {
    api.stadiums().fetchById(id)
        .then(response => {
            dispatch({
                type: FETCH_STADIUMS_BY_CLUBID_SUCCESS ,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_STADIUMS_BY_CLUBID_ERROR,
                payload: err });
        });
}