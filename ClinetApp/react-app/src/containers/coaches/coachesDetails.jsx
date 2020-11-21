﻿import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import * as actions from "../footballers/footballersActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {useToasts} from "react-toast-notifications";

const CoachesDetails = ({ match }) => {
    const {
        params: { personId },
    } = match;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        props.fetchAllFootBalers()
    }, [personId])

    //toast msg.
    const { addToast } = useToasts()
    return (
        <>
            {!isLoading && (

                <h1>Name: {data.firstName}</h1>
                <h1>Middle Name: {data.firstName}</h1>
                <h1>Nationality: {data.nationality}</h1>
                <h1>Data of birth: {data.dataOfBirth}</h1>
                <h1>Place of birth: {data.placeOfBirth}</h1>
                <h2>Count of Victories: {data.countOfVictories}</h2>
                <h2>Years of expirience: {data.yearsOfExpirience}</h2>
            {data.footballClubs.map((club)=>{
                <ul>
                <li>
                {club.footballClubName}
                </li>
                <li>
                {club.footballClubName}
                </li>
                </ul>
            })}
                <Link to="/">Back to homepage</Link>
                </>
                )}
        </>
    );
};

const mapStateToProps = state => ({
    coach: state.coaches.coach,
})

const mapDispatchToProp = {
    fetchCoachById: actions.fetchById,
}

export default connect(mapStateToProps, mapDispatchToProp)(FootballerDetails);




