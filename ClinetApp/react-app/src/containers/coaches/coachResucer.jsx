import {COACH_DETAIL_ERROR, COACH_DETAIL_REQUEST, COACH_DETAIL_SUCCESS} from "./coachesCostants";
const INITIAL_STATE = {
    coach: null,
    loading:true,
    error:''
}

export const coaches =(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case COACH_DETAIL_REQUEST :
            return {
                loading: true
            }
        case COACH_DETAIL_SUCCESS :
        return {
            coach: action.payload ,
            loading: false
        }
        case COACH_DETAIL_ERROR :{}
            return {
                coach:  null,
                error: action.payload ,
            }
        
        default:
            return state;
    }

}