import {
    FETCH_FOOTBALL_CLUB_LIST_ERROR,
    FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
    FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
    FOOTBALL_CLUB_DETAIL_ERROR, FOOTBALL_CLUB_DETAIL_REQUEST, FOOTBALL_CLUB_DETAIL_SUCCESS
} from "./footballClubsConstants";
import api from "./api";



export const fetchById = (clubId) => async dispatch => {
    try{
        dispatch({ type: FOOTBALL_CLUB_DETAIL_REQUEST });
        console.log(clubId);
        const { data } = await api.clubs().fetchById(clubId);
        console.log(data.data)
        dispatch({ type:FOOTBALL_CLUB_DETAIL_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type: FOOTBALL_CLUB_DETAIL_ERROR, payload: err.message  });
    }
}

export const fetchAll = () => dispatch => {
    api.clubs().fetchAll()
        .then(response => {
            dispatch({
                type: FETCH_FOOTBALL_CLUB_LIST_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FETCH_FOOTBALL_CLUB_LIST_ERROR, payload: err });
        }); 
}


/*export const fetchById = (clubId) => dispatch => {
    api.clubs().fetchById(clubId)
        .then(response => {
            console.log("Response")
            console.log(response.data)
            dispatch({
                type: FOOTBALL_CLUB_DETAIL_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FOOTBALL_CLUB_DETAIL_ERROR, payload: err.message  });
        });
}*/

export const fetchByPlayerId = (playerId) => dispatch => {
    api.clubs().fetchByPlayerId(playerId)
        .then(response => {
            dispatch({
                type: FOOTBALL_CLUB_BY_PLAYER_LIST_SUCCESS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: FOOTBALL_CLUB_BY_PLAYER_LIST_ERROR, payload: err });
        });
}
