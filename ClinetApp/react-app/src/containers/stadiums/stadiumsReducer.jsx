import {
    FETCH_STADIUMS_BY_CLUBID_ERROR,
    FETCH_STADIUMS_BY_CLUBID_SUCCESS,
    FETCH_STADIUMS_BY_ID_ERROR,
    FETCH_STADIUMS_BY_ID_SUCCESS
} from "./stadiumsConstants";

const INITIAL_STATE = {
    stadiums: [],
    stadium:null,
    statusCodeClass: ''
}

export const stadiums =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_STADIUMS_BY_ID_SUCCESS:
            return {
                ...state,
                stadium: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_STADIUMS_BY_ID_ERROR :
            return {
                ...state,
                stadium:  null,
                statusCodeClass: 'error'
            }
        case FETCH_STADIUMS_BY_CLUBID_SUCCESS:
            return {
                ...state,
                stadiums: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_STADIUMS_BY_CLUBID_ERROR:
            return {
                ...state,
                stadiums:  [],
                statusCodeClass: 'error'
            }
        default:
            return state;
    }
}