import MatchesTable from "./matchesTable";

﻿import React, { useState, useEffect } from "react";
import * as actions from "../footballers/footballersActions";
import {connect, useDispatch, useSelector} from "react-redux";
import {withStyles} from "@material-ui/core";
import{fetchNextMatches} from "./matchActions";
import {useToasts} from "react-toast-notifications";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PieChart from "../../components/charts/pirChart";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles =theme => ({
    root: {
        fontFamily: 'Goldman',
        fonSize:'4em',
        display: 'flex',

    },
    nestedProp:{
        opacity: '0.9',
        fontSize: '1.5vw',
    },
    property:{
        fontSize: '1.5vw',
        opacity: '0.7',
        marginBottom:'0'
    },
    profile: {
        width: '50vw',
        padding: '5vw 10vw',
        boxSizing: 'border-box',
        display: 'flex',
        color: '#2c2c54',
        flexDirection: 'column'
    },
    gridRoot:{
        flexGrow: 1,
    }
})

const MatchPage = ({ classes,...props  }) => {
    const dispatch = useDispatch();
    const matchesDetails = useSelector((state) => state.matches);
    const { matches , loading, error } =matchesDetails;

    useEffect(() => {
        dispatch(fetchNextMatches())
        return () => {
        };
    }, [])

    //toast msg.
    const { addToast } = useToasts()

    const resultIsLoading = props.results===undefined || props.results===null || props.results.length ===0;
    return (
        <div className={classes.root}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error} </div>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Divider light />
                      
                        <Grid item xs={12}>
                            <Container maxWidth='lg'>
                                <Typography variant='h2' color='primary' align='center' >Next Matches</Typography>
                                <MatchesTable matches={props.nextMatches} />
                            </Container>
                        </Grid>
                        <Divider light />
                    </Grid>
                </>
            )}
        </div>
    );
};
const mapStateToProps = state => ({
    nextMatches: state.matches.matches

})

const mapDispatchToProp = {
    fetchNextMatches:fetchNextMatches

}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(MatchPage));


