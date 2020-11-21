import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

import ClubList from "../containers/clubs/footballClubsList.jsx";
import About from "../containers/about/about.jsx";
import FootballResultTable from "../containers/footballerResults/footballResultsList";
import FootballersList from "../containers/footballers/footballersWithRolesList";
import FootballerDetails from "../containers/footballers/footballersDetails"
import TrainingsList from "../containers/trainings/trainingsList"
export default class Routing extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/clubs" component={ClubList} />
                    <Route exact path="/results" component={FootballResultTable} />
                    <Route exact path="/footballers" component={FootballersList} />
                    <Route path="/footballers/:personId" component={FootballerDetails} />
                    <Route path="/trainings" component={TrainingsList} />
                    <Route exact path="/" render={() => (<Redirect to="/clubs" />)} />
                </Switch>
            </main>
        );
    }
};