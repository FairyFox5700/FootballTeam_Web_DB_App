import api from "./api";
export const FETCH_SPONSORS_BY_ID_SUCCESS = 'FETCH_SPONSORS_BY_ID_SUCCESS';
export const FETCH_SPONSORS_BY_ID_ERROR = 'FETCH_SPONSORS_BY_ID_ERROR';
export const FETCH_SPONSORS_BY_CLUBID_SUCCESS = 'FETCH_SPONSORS_BY_CLUBID_SUCCESS';
export const FETCH_SPONSORS_BY_CLUBID_ERROR = 'FETCH_SPONSORS_BY_CLUBID_ERROR';


export const fetchAllByClubId = (clubId) => dispatch => {
    api.sponsores().fetchAllByClubId(clubId)
        .then(response => {
            dispatch({
                type: FETCH_SPONSORS_BY_ID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_SPONSORS_BY_ID_ERROR,
                payload: err });
        });
}

export const fetchById = (id) => dispatch => {
    api.sponsores().fetchById(id)
        .then(response => {
            dispatch({
                type: FETCH_SPONSORS_BY_CLUBID_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_SPONSORS_BY_CLUBID_ERROR,
                payload: err });
        });
}
