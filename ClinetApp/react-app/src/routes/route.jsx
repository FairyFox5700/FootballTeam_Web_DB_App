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

export default class Routing extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/clubs" component={ClubList} />
                    <Route exact path="/" render={() => (<Redirect to="/clubs" />)} />
                </Switch>
            </main>
        );
    }
};