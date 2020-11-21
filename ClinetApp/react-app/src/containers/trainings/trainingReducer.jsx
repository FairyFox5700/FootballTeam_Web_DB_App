import {
    FETCH_TRAININGS_BY_COACH_ID_ERROR,
    FETCH_TRAININGS_BY_COACH_ID_SUCCESS,
    FETCH_TRAININGS_BY_ID_SUCCESS
} from "./trainingActions";
import {ETCH_TRAININGS_ID_ERROR} from "./trainingConstants";

const INITIAL_STATE = {
    trainings: [],
    training:null,
    statusCodeClass: ''
}

export const trainings =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_TRAININGS_BY_ID_SUCCESS :
            return {
                ...state,
                stadium: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case ETCH_TRAININGS_ID_ERROR :
            return {
                ...state,
                stadium:  null,
                statusCodeClass: 'error'
            }
        case FETCH_TRAININGS_BY_COACH_ID_SUCCESS:
            return {
                ...state,
                stadiums: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_TRAININGS_BY_COACH_ID_ERROR:
            return {
                ...state,
                stadiums:  [],
                statusCodeClass: 'error'
            }
        default:
            return state;
    }
}