import {
    FETCH_SEASONS_BY_CLUBID_ERROR,
    FETCH_SEASONS_BY_CLUBID_SUCCESS,
    FETCH_SEASONS_BY_ID_ERROR,
    FETCH_SEASONS_BY_ID_SUCCESS,
} from "./seasonesConstants";

const INITIAL_STATE = {
    season: null,
    seasons:[],
    statusCodeClass: ''
}

export const seasones =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_SEASONS_BY_ID_SUCCESS:
            return {
                ...state,
                season: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_SEASONS_BY_ID_ERROR :
            return {
                ...state,
                season:  null,
                statusCodeClass: 'error'
            }
        case FETCH_SEASONS_BY_CLUBID_SUCCESS :
            return {
                ...state,
                seasons:  [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_SEASONS_BY_CLUBID_ERROR:
            return {
                ...state,
                seasons:  [],
                statusCodeClass: 'error'
            }
        default:
            return state;
    }

}