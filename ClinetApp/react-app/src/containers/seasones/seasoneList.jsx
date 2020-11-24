import React, { useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from "./seasonesAction";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));


const SeasonsList  = (props) => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [seasonesList, setSeasonesList] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchAllByClubId(props.clubId));
    }, [dispatch])
    
    /*const list =  dispatch(actions.fetchAllByClubId(props.clubId));*/
    const {  listS, loading, error } = useSelector(
        state => ({
           listS: state.seasones.seasons,
        })
    );
    return (
        
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Season Id</TableCell>
                                    <TableCell>league Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listS.map((record) => {
                                        return (<TableRow key={record.leagueId} hover>
                                                <TableCell>{record.leagueId}</TableCell>
                                                <TableCell>{record.leagueName}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    seasonsList: state.seasones.seasons,
})

const mapDispatchToProp = {
    fetchAllSeasones: actions.fetchAllByClubId,
}

export default SeasonsList



