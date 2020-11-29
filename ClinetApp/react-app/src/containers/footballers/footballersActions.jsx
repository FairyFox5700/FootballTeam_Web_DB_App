import api from "./api";
import {
    ADD_PLAYERS_WITH_ROLES_REQUEST,
    ADD_PLAYERS_WITH_ROLES_REQUEST_ERROR,
    FETCH_PLAYERS_BY_ID_ERROR, FETCH_PLAYERS_BY_ID_REQUEST,
    FETCH_PLAYERS_BY_ID_SUCCESS,
    FETCH_PLAYERS_BY_ROLE_NAME_ERROR, FETCH_PLAYERS_BY_ROLE_NAME_REQUEST,
    FETCH_PLAYERS_BY_ROLE_NAME_SUCCESS,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_FILTERED_ERROR,
    FETCH_PLAYERS_FILTERED_SUCCESS,
    FETCH_PLAYERS_ORDERED_ERROR,
    FETCH_PLAYERS_ORDERED_SUCCESS,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_WITH_ROLES_ERROR, FETCH_PLAYERS_WITH_ROLES_REQUEST,
    FETCH_PLAYERS_WITH_ROLES_SUCCESS, UPDATE_PLAYERS_WITH_ROLES_REQUEST, UPDATE_PLAYERS_WITH_ROLES_REQUEST_ERROR
} from "./footballersContsants";
import {
    FOOTBALL_CLUB_DETAIL_ERROR,
    FOOTBALL_CLUB_DETAIL_REQUEST,
    FOOTBALL_CLUB_DETAIL_SUCCESS
} from "../clubs/footballClubsConstants";

export const fetchAllWithRoles = ()  => async dispatch => {
    try{
        dispatch({ type: FETCH_PLAYERS_WITH_ROLES_REQUEST });
        const { data } = await api.footballers().fetchAll()
        console.log(data.data)
        dispatch({ type:FETCH_PLAYERS_WITH_ROLES_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_PLAYERS_WITH_ROLES_ERROR, payload: err.message  });
    }
}
export const updateFootballer =  (playerId,footballer) =>async dispatch => {
    try {
        return (dispatch) => {
            if (footballer) {
                dispatch({type: UPDATE_PLAYERS_WITH_ROLES_REQUEST});
                const {data} = api.footballers().updateFootballer(JSON.stringify({
                    playerId:playerId,
                    footballer: footballer
                }));
                console.log("RESPONSE RECEIVED: ", data);
            }
        }
    } catch (err) {
        console.log(err)
        dispatch({type: UPDATE_PLAYERS_WITH_ROLES_REQUEST_ERROR, payload: err.message});
    }
}


    export const deleteFootballer = (id) =>async dispatch => {
        try {
            return (dispatch) => {
                    dispatch({type: UPDATE_PLAYERS_WITH_ROLES_REQUEST});
                    const {data} = api.footballers().delete(id);
                    console.log("RESPONSE RECEIVED: ", data);
            }
        }
        catch(err ) {
            console.log(err)
            dispatch({ type:UPDATE_PLAYERS_WITH_ROLES_REQUEST_ERROR, payload: err.message  });
        }
    }

    export const addFootballer= (footballer, roleId) =>async dispatch => {
        try {
            return (dispatch) => {
                if (footballer && roleId) {
                    dispatch({type: ADD_PLAYERS_WITH_ROLES_REQUEST});
                    const {data} = api.footballers().addFootballer(JSON.stringify({
                        footballer: footballer
                    }));
                    console.log("RESPONSE RECEIVED: ", data);
                }
            }
        } catch (err) {
            console.log(err)
            dispatch({type: ADD_PLAYERS_WITH_ROLES_REQUEST_ERROR, payload: err.message});
        }
    }

export const fetchAll=() => async dispatch => {
    try{
        dispatch({ type: FETCH_PLAYERS_BY_ROLE_NAME_REQUEST });
        const { data } = await api.footballers().fetchAll()
        console.log(data)
        dispatch({ type:FETCH_PLAYERS_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_PLAYERS_ERROR, payload: err.message  });
    }
}


export const fetchById = (playerId)=> async dispatch => {
    try{
        dispatch({ type: FETCH_PLAYERS_BY_ID_REQUEST });
        console.log(playerId);
        const { data } = await api.footballers().fetchById(playerId);
        console.log(data)
        dispatch({ type:FETCH_PLAYERS_BY_ID_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_PLAYERS_BY_ID_ERROR, payload: err.message  });
    }
}

export const fetchAllByRoleName = (roleName)=> async dispatch => {
    try{
        dispatch({ type: FETCH_PLAYERS_BY_ROLE_NAME_REQUEST });
        console.log(roleName);
        const { data } = await api.footballers().fetchByRoleName(roleName);
        console.log(data)
        dispatch({ type:FETCH_PLAYERS_BY_ROLE_NAME_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_PLAYERS_BY_ROLE_NAME_ERROR, payload: err.message  });
    }
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