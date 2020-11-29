import Chart from "react-apexcharts";

﻿import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import * as actions from "../footballers/footballersActions";
import {connect, useDispatch, useSelector} from "react-redux";
import {withStyles} from "@material-ui/core";
import {useToasts} from "react-toast-notifications";
import  {fetchByPlayerId} from "../clubs/footballClubsAction"
import  {fetchTotalResultsByPlayerId} from "../footballerResults/footballResultsActions"
import ClubList from "../clubs/footballClubsList";
import  PieChart from "../../components/charts/pirChart"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";


const styles =theme => ({
    root: {
        fontFamily: 'Goldman',
        fonSize:'4em',
        display: 'flex',

    },
    image:{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://www.telegraph.co.uk/content/dam/football/spark/FootballIndex/footballer-kicking-ball-on-pitch-xlarge.jpg)',
        width: '50vw',
        flexDirection: 'column',
        position: 'relative',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "8rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    '@media screen and (max-width: 980px)': {
        Image: {
            width: '100vw',
            height: '70vh',
        },
        Profile: {
            width: '100vw',
            height: '30vh'
        }
    },
    name:{
        fontSize: '6vw',
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

const FootballerDetails = ({ match, classes,...props  }) => {
    const {
        params: { personId },
    } = match;
    const dispatch = useDispatch();
    const footballerDetails = useSelector((state) => state.footballers);
    const { footballer , loading, error } =footballerDetails;

    const resultDetails = useSelector((state) => state.footballResults);
    console.log(resultDetails)
    const { result} =resultDetails;
    useEffect(() => {
        dispatch(fetchTotalResultsByPlayerId(personId))
        dispatch(fetchByPlayerId(personId))
        dispatch(actions.fetchById(personId))
        return () => {
        };
    }, [personId])

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
                        <Grid item xs={12}>
                            <div className={classes.root}>
                                <div className={classes.image}>
                                </div>
                                <div className={classes.profile}>
                                    <div className={classes.name}>
                                        {footballer.firstName + ' ' + footballer.middleName}
                                    </div>
                                    <div>
                                        <p className={classes.property}><span
                                            className={classes.nestedProp}>Place of birth:</span>{footballer.placeOfBirth}</p>
                                        <p className={classes.property}><span
                                            className={classes.nestedProp}>Nationality:</span>{footballer.nationality}</p>
                                        <p className={classes.property}><span
                                            className={classes.nestedProp}>Data of birth:</span> {footballer.dataOfBirth}</p>
                                        <p className={classes.property}><span
                                            className={classes.nestedProp}>Height:</span>{footballer.height}</p>
                                        <p className={classes.property}><span
                                            className={classes.nestedProp}>Weight: </span>{footballer.weight}</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            < Container maxWidth='lg'>
                                <ClubList clubs={props.clubs}/>
                            </Container>
                        </Grid>
                        {
                            resultIsLoading? (
                                    <div>Loading...</div>
                                ) :
                                (
                                    <>
                                    < Container maxWidth='lg' className={classes.root}>
                                        <Grid alignContent='center' item xs={6}>
                                            <PieChart alignContent='center' options={{labels: ["Scored Goals", "Missed Goals"]}}
                                                      series={[result.scoredGoalsTotalCount, result.missedGoalsTotalCount]}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <PieChart
                                                options={{labels: ["Red cards", "Yellow cards"]}}
                                                series={[result.redCardTotalCount, result.yellowCardTotalCount]}/>
                                        </Grid>
                                    </Container>
                                    </>
                                )
                        }

                    </Grid>
                </>
            )}
        </div>
    );
};
const mapStateToProps = state => ({
    footballer: state.footballers.footballer,
    clubs: state.clubs.clubs,
    results: state.footballResults.result

})

const mapDispatchToProp = {
    fetchSponsorsByClubId: actions.fetchById,
    fetchClubsForFootballer :fetchByPlayerId,

}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(FootballerDetails));


