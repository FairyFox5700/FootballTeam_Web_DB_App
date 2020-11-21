﻿import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import * as actions from "../footballers/footballersActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {useToasts} from "react-toast-notifications";

const FootballerDetails = ({ match }) => {
    const {
        params: { personId },
    } = match;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        props.fetchFootballerById()
    }, [personId])

    //toast msg.
    const { addToast } = useToasts()
    
    return (
        <>
            {!isLoading && (

                    <h1>Name: {data.firstName}</h1>
                    <h1>Middle Name: {data.middleName}</h1>
                    <h1>Nationality: {data.middleName}</h1>
                    <h1>Data of birth: {data.middleName}</h1>
                    <h2>Height: {data.height}</h2>
                    <h2>Weight: {data.weight}</h2>
                    <Link to="/">Back to homepage</Link>
                </>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    footballer: state.footballers.footballer,
})

const mapDispatchToProp = {
    fetchFootballerById: actions.fetchById,
}

export default connect(mapStateToProps, mapDispatchToProp)(FootballerDetails);


