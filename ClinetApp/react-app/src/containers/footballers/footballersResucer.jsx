import {
    FETCH_PLAYERS_BY_ID_ERROR,
    FETCH_PLAYERS_BY_ID_SUCCESS,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_WITH_ROLES_ERROR,
    FETCH_PLAYERS_WITH_ROLES_SUCCESS
} from "./footballersContsants";

const INITIAL_STATE = {
    footballers: [],
    footballer:null,
    statusCodeClass: ''
}

export const footballers =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                footballers:  [...action.payload] ,
                footballer:null,
                statusCodeClass: 'ok'
            }
        case FETCH_PLAYERS_ERROR:
            return {
                ...state,
                footballers:  [],
                footballer:null,
                statusCodeClass: 'error'
            }
        case FETCH_PLAYERS_WITH_ROLES_SUCCESS:
            return {
                ...state,
                footballers:  [...action.payload] ,
                footballer:null,
                statusCodeClass: 'ok'
            }
        case FETCH_PLAYERS_WITH_ROLES_ERROR:
            return {
                ...state,
                footballers:  [],
                footballer:null,
                statusCodeClass: 'error'
            }
        case FETCH_PLAYERS_BY_ID_SUCCESS:{}
        return {
            ...state,
            footballer: [...action.payload] ,
            footballers:[],
            statusCodeClass: 'ok'
        }
        case FETCH_PLAYERS_BY_ID_ERROR:{}
            return {
                ...state,
                footballer: null,
                footballers:[],
                statusCodeClass: 'error'
            }
        
        default:
            return state;
    }

}