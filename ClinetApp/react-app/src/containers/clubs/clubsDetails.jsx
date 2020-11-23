import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {TableCell, TableRow} from "@material-ui/core";
import {useToasts} from "react-toast-notifications";
import {Link} from "react-router-dom";
import * as actions from "./footballClubsAction";
import {connect, useDispatch, useSelector} from "react-redux";
import SeasonsList from "../seasones/seasoneList";
import SponsorsList from "../sponsores/sponsoresList";
import withStyles from "@material-ui/core/styles/withStyles";
import api from "./api";

const styles =theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
});

const ClubDetails= ({  match, classes,...props  }) => {
    const {
        params: { clubId },
    } = match;

    useEffect( () => {
        props.fetchClubById(clubId)
    }, [clubId])

   
    //toast msg.
    const { addToast } = useToasts()
    const player = actions.fetchById(
        parseInt(clubId, 10)
    )
    if (!player) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Foootballer club
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <span>Club Name</span>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        {props.club.footballClubName}
                    </Paper>
                </Grid>
                <Divider className={classes.divider} />
                
                <Typography variant="subtitle1" gutterBottom>
                    Sponsores:
                </Typography>
                <Grid item xs={12}>
                    <SponsorsList clubId={clubId}  />
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </div>
    );
}
const mapStateToProps = state => ({
    club: state.clubs.club,
    clubs: state.clubs.clubs
})

const mapDispatchToProp = {
    fetchClubById: actions.fetchById,
    fetchAllFootBallClubs:actions.fetchAll
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(ClubDetails));

