import {FETCH_ROLES_BY_NAME_ERROR, FETCH_ROLES_BY_NAME_SUCCESS} from "./rolesConstants";

const INITIAL_STATE = {
    role: null,
    statusCodeClass: ''
}
export const roles=(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_ROLES_BY_NAME_SUCCESS :
            return {
                ...state,
                role: [...action.payload] ,
                statusCodeClass: 'ok'
            }
        case FETCH_ROLES_BY_NAME_ERROR :
            return {
                ...state,
                role:null,
                statusCodeClass: 'error'
            }
        default:
            return state;
    }

}