import {
    FETCH_MATCHES_BY_ID_ERROR,
    FETCH_MATCHES_BY_ID_SUCCESS,
    FETCH_MATCHES_ERROR, FETCH_MATCHES_REQUEST,
    FETCH_MATCHES_SUCCESS, FETCH_NEXT_MATCHES_ERROR, FETCH_NEXT_MATCHES_REQUEST, FETCH_NEXT_MATCHES_SUCCESS
} from "./matchConstants";
import api from "./api";
import {
    FETCH_PLAYERS_BY_ROLE_NAME_REQUEST,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS
} from "../footballers/footballersContsants";



export const fetchAll = () => async dispatch => {
    try{
        dispatch({ type: FETCH_MATCHES_REQUEST });
        const { data } = await api.matches().fetchAll()
        console.log(data)
        dispatch({ type:FETCH_MATCHES_SUCCESS,payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_MATCHES_ERROR, payload: err.message  });
    }
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
export const fetchNextMatches= () => async dispatch => {
    try{
        dispatch({ type: FETCH_NEXT_MATCHES_REQUEST });
        const { data } = await api.matches().fetchNextMatches()
        console.log(data)
        dispatch({ type:FETCH_NEXT_MATCHES_SUCCESS,payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_NEXT_MATCHES_ERROR, payload: err.message  });
    }
}

