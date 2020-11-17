import { combineReducers } from 'redux';
import  {clubs} from "../containers/clubs/footballClubsReducer"
export const reducers= combineReducers({
    clubs
});

export default reducers;
