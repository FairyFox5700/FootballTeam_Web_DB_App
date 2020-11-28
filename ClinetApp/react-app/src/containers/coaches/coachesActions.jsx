import api from "./api";
import {COACH_DETAIL_ERROR, COACH_DETAIL_REQUEST, COACH_DETAIL_SUCCESS} from "./coachesCostants";


export const fetchById = (clubId) => async dispatch => {
    try{
        dispatch({ type: COACH_DETAIL_REQUEST });
        const { data } = await  api.footballResults().fetchByPlayerId(playerId);
        console.log(data.data)
        dispatch({ type:COACH_DETAIL_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: COACH_DETAIL_ERROR, payload: err.message  });
    }
}
