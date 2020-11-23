﻿import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import * as actions from "../footballers/footballersActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {useToasts} from "react-toast-notifications";

const FootballerDetails = ({ match, ...props  }) => {
    const {
        params: { personId },
    } = match;
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        props.fetchFootballerById()
    }, [personId])

    //toast msg.
    const { addToast } = useToasts()
    
    return (
        <>
            {!isLoading && (
                    <>
                   
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
    fetchSponsorsByClubId: actions.fetchById,
}

export default connect(mapStateToProps, mapDispatchToProp)(FootballerDetails);


