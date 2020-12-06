import { combineReducers } from 'redux';
import  {clubs} from "../containers/clubs/footballClubsReducer"
import {footballResults} from "../containers/footballerResults/footballResultsReducer";
import {footballers} from "../containers/footballers/footballersReducer";
import {matches} from "../containers/match/matchesReducer";
import {coaches} from "../containers/coaches/coachResucer";
import {trainings} from "../containers/trainings/trainingReducer";
import {stadiums} from "../containers/stadiums/stadiumsReducer";
import {sponsores} from "../containers/sponsores/sponsoresReducer";
import {seasones} from "../containers/seasones/seasonesReducer";
import {roles} from "../containers/roles/rolesReducer"; 
export const reducers= combineReducers({
    clubs,
    footballResults,
    footballers,
    matches,
    coaches,
    trainings,
    stadiums,
    sponsores,
    seasones,
    roles
});

export default reducers;
