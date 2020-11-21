import {COACH_DETAIL_ERROR, COACH_DETAIL_SUCCESS} from "./coachesCostants";
const INITIAL_STATE = {
    coach: null,
    statusCodeClass: ''
}

export const coaches =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case COACH_DETAIL_SUCCESS :{}
        return {
            ...state,
            coach: [...action.payload] ,
            statusCodeClass: 'ok'
        }
        case COACH_DETAIL_ERROR :{}
            return {
                ...state,
                coach:  null,
                statusCodeClass: 'error'
            }
        
        default:
            return state;
    }

}