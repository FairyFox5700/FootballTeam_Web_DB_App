import api from "./api";
import {
    FETCH_ROLES_BY_NAME_ERROR, FETCH_ROLES_BY_NAME_REQUEST,
    FETCH_ROLES_BY_NAME_SUCCESS,
    FETCH_ROLES_ERROR, FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS
} from "./rolesConstants";
import {
    FETCH_PLAYERS_BY_ID_ERROR,
    FETCH_PLAYERS_BY_ID_REQUEST,
    FETCH_PLAYERS_BY_ID_SUCCESS
} from "../footballers/footballersContsants";


export const fetchAllByName = (name)=> async dispatch => {
    try{
        dispatch({ type:FETCH_ROLES_BY_NAME_REQUEST });
        const { data } = await api.roles().fetchAllByName(name);
        console.log(data.data)
        dispatch({ type:FETCH_ROLES_BY_NAME_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_ROLES_BY_NAME_ERROR, payload: err.message  });
    }
}

export const fetchAll  = ()=> async dispatch => {
    try{
        dispatch({ type:FETCH_ROLES_REQUEST });
        const { data } = await api.roles().fetchAll();
        console.log(data.data)
        dispatch({ type:FETCH_ROLES_SUCCESS, payload: data });
    }
    catch(err ) {
        console.log(err)
        dispatch({ type:FETCH_ROLES_ERROR, payload: err.message  });
    }
}
