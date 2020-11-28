import {
    FETCH_ROLES_BY_NAME_ERROR,
    FETCH_ROLES_BY_NAME_REQUEST,
    FETCH_ROLES_BY_NAME_SUCCESS, FETCH_ROLES_ERROR,
    FETCH_ROLES_REQUEST, FETCH_ROLES_SUCCESS
} from "./rolesConstants";
const INITIAL_STATE = {
    role: null,
    roles:[],
    statusCodeClass: '',
    loading:true,
    error:''
}
export const roles=(state = INITIAL_STATE, action)=> {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case FETCH_ROLES_BY_NAME_REQUEST:
        case FETCH_ROLES_REQUEST :
            return { loading: true };
        case FETCH_ROLES_BY_NAME_SUCCESS :
            return {
                loading: false,
                role: action.payload,
            }
        case FETCH_ROLES_BY_NAME_ERROR :
        case FETCH_ROLES_ERROR:
            return {
                    loading: false,
                    error: action.payload
            }
        case FETCH_ROLES_SUCCESS:
            return {
                loading: false,
                roles: action.payload,
            }
        default:
            return state;
    }

}