import React, {Suspense, useEffect, useState} from 'react';
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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Container from "@material-ui/core/Container";

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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        height:300,
        transform: 'translateZ(0)',
    },
    title:{
        fontSize:"38px",
        margin:"0 auto 30px",
        fontFamily: 'Goldman'
       
    },

    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

const ClubDetails= ({  match, classes,...props  }) => {
    const {
        params: { clubId },
    } = match;
    const dispatch = useDispatch();
    const clubDetails = useSelector((state) => state.clubs);
    const { club , loading, error } = clubDetails;
    useEffect(() => {
       
        dispatch(actions.fetchById(clubId))
        return () => {
        };
    }, [clubId]);

    //toast msg.
    const { addToast } = useToasts()
    return (
        <div>
            
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error} </div>
            ) : (
                <>
                    <Container maxWidth='lg'   alignContent='center' className={classes.root} >
                        <h2 className={classes.title}> {club.footballClubName}</h2>
                    <Grid container spacing={1}>
                        <Divider className={classes.divider}/>
                        <Typography color='primary' variant="h5" align='center' >
                            Logos
                        </Typography>
                        <Grid  alignContent='center' item xs={12}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>{error} </div>
                            ) : (
                            <GridList className={classes.gridList} cols={4}>
                                {club.logos.map((tile) => (
                                    <GridListTile key={tile.logoId}>
                                        <img style={{ height: 'auto', width: '50%' ,
                                            display: 'block',
                                            margin: '0 auto'
                                        }}  alt={tile.imageName} 
                                             src={atob(tile.image)}></img>
                                        <GridListTileBar
                                            title={tile.imageName}
                                            classes={{
                                                root: classes.titleBar,
                                               
                                            }}
                                            actionIcon={
                                                <IconButton aria-label={`star ${tile.title}`}>
                                                    <StarBorderIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                                )}
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider}/>
                    </Container>
                </>)
            }
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

