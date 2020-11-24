import {
    FETCH_SPONSORS_BY_CLUBID_ERROR,
    FETCH_SPONSORS_BY_CLUBID_SUCCESS,
    FETCH_SPONSORS_BY_ID_ERROR,
    FETCH_SPONSORS_BY_ID_SUCCESS
} from "./sponsoresActions";

const INITIAL_STATE = {
    sponsors: [],
    sponsor:null,
    statusCodeClass: ''
}

export const sponsores =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_SPONSORS_BY_ID_SUCCESS:
            return {
                ...state,
                sponsor: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_SPONSORS_BY_ID_ERROR:
            return {
                ...state,
                sponsor: null,
                statusCodeClass: 'error'
            }
        case FETCH_SPONSORS_BY_CLUBID_SUCCESS :
      
            return {
                ...state,
                sponsors: [action.payload.data],
                statusCodeClass: 'ok'
            }
        case FETCH_SPONSORS_BY_CLUBID_ERROR :
            return {
                ...state,
                sponsors:  [],
                statusCodeClass: 'error'
            }
        default:
            return state;
    }

}