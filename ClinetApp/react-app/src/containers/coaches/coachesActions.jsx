import api from "./api";
import {COACH_DETAIL_ERROR, COACH_DETAIL_SUCCESS} from "./coachesCostants";


export const fetchById = (clubId) => dispatch => {
    api.coaches().fetchById(clubId)
        .then(response => {
            dispatch({
                type: COACH_DETAIL_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: COACH_DETAIL_ERROR,
                payload: err });
        });
}