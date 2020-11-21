import api from "./api";

export const FETCH_TRAININGS_BY_ID_SUCCESS = 'ETCH_TRAININGS_BY_ID_SUCCESS';
export const FETCH_TRAININGS_ID_ERROR = 'FETCH_TRAININGS_BY_ID_ERROR';
export const FETCH_TRAININGS_BY_COACH_ID_SUCCESS = 'FETCH_TRAININGS_BY_COACH_ID_SUCCESS';
export const FETCH_TRAININGS_BY_COACH_ID_ERROR = 'FETCH_TRAININGS_BY_COACH_ID_ERROR';

export const fetchById= (id) => dispatch => {
    api.trainings().fetchById(id)
        .then(response => {
            dispatch({
                type:FETCH_TRAININGS_BY_ID_SUCCESS ,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type:FETCH_TRAININGS_ID_ERROR,
                payload: err });
        });
}

export const fetchAllByClubId = (coachId) => dispatch => {
    api.trainings().fetchAllByCoachId(coachId)
        .then(response => {
            dispatch({
                type:FETCH_TRAININGS_BY_COACH_ID_SUCCESS ,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type:FETCH_TRAININGS_BY_COACH_ID_ERROR,
                payload: err });
        });
}